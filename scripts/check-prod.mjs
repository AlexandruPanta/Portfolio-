/* Vérification post-déploiement — DESIGN.md §18.

   Tourne après chaque déploiement en production, contre les vraies
   URL publiques (pas localhost). Un seul échec = sortie en erreur :
   pensé pour un pipeline de déploiement, pas pour un humain qui lit
   la sortie en diagonale.

   Usage :  node scripts/check-prod.mjs
   Variables : APEX (défaut alexpanta.dev), VERCEL_URL (défaut
   portfolio-bice-nine-45.vercel.app — l'URL sur le CV).
*/

const APEX = process.env.APEX || 'alexpanta.dev';
const WWW = `www.${APEX}`;
const VERCEL_URL = process.env.VERCEL_URL || 'portfolio-bice-nine-45.vercel.app';
/* Anglais à la racine (defaultLocale), français sous /fr/ — voir
   next.config.js et DESIGN.md §19. */
const PAGES = ['/', '/work/zoecare', '/work/ab-tasty'];
const FR_PAGES = ['/fr', '/fr/work/zoecare', '/fr/work/ab-tasty'];

let failed = false;

function report(ok, label, detail) {
  console.log(`${ok ? '  OK  ' : '  ÉCHEC'} ${label}${detail ? ' — ' + detail : ''}`);
  if (!ok) failed = true;
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, { redirect: 'manual', ...opts });
  const text = await res.text().catch(() => '');
  return { status: res.status, headers: res.headers, text, url: res.url };
}

async function checkApex() {
  const r = await fetchText(`https://${APEX}/`);
  report(r.status === 200, `apex https://${APEX}/ répond 200`, `reçu ${r.status}`);
  report(!r.text.includes('cdn-cgi'), 'aucune réécriture Cloudflare (cdn-cgi)', r.text.includes('cdn-cgi') ? 'trouvé' : '');
}

async function checkWwwRedirect() {
  const r = await fetchText(`https://${WWW}/`);
  const location = r.headers.get('location') || '';
  const ok = r.status === 308 && location.replace(/\/$/, '') === `https://${APEX}`;
  report(ok, `www.${APEX} redirige en 308 vers l'apex`, `status=${r.status} location=${location}`);
}

async function checkVercelUrl() {
  const r = await fetchText(`https://${VERCEL_URL}/`, { redirect: 'follow' });
  report(r.status === 200, `${VERCEL_URL} accessible`, `reçu ${r.status}`);
}

async function checkMailto() {
  const r = await fetchText(`https://${APEX}/`);
  const hasMailto = /href="mailto:[^"]+@[^"]+"/.test(r.text);
  report(hasMailto, 'mailto intact dans le HTML');
  report(!r.text.includes('email-protection'), 'aucune obfuscation d’adresse (Cloudflare)', r.text.includes('email-protection') ? 'trouvé' : '');
}

async function checkOgImageAbsolute(path) {
  const r = await fetchText(`https://${APEX}${path}`);
  const m = r.text.match(/property="og:image"\s+content="([^"]+)"/);
  const ok = !!m && m[1].startsWith(`https://${APEX}`);
  report(ok, `og:image absolue sur ${path}`, m ? m[1] : 'balise absente');

  const canon = r.text.match(/rel="canonical"\s+href="([^"]+)"/);
  const canonOk = !!canon && canon[1].startsWith(`https://${APEX}`);
  report(canonOk, `canonical absolue sur ${path}`, canon ? canon[1] : 'balise absente');
}

/* i18n — DESIGN.md §19. Une URL partagée doit toujours rendre la même
   page dans la même langue : lang, hreflang complet, et og:locale
   cohérent avec la locale réellement servie. */
async function checkI18n(path, expectedLang, expectedLocale) {
  const r = await fetchText(`https://${APEX}${path}`);

  const htmlLang = r.text.match(/<html[^>]*\blang="([^"]+)"/);
  report(
    !!htmlLang && htmlLang[1] === expectedLang,
    `<html lang="${expectedLang}"> sur ${path}`,
    htmlLang ? htmlLang[1] : 'absent'
  );

  const hasFr = /rel="alternate"\s+hrefLang="fr"\s+href="https:\/\/[^"]+"/.test(r.text);
  const hasEn = /rel="alternate"\s+hrefLang="en"\s+href="https:\/\/[^"]+"/.test(r.text);
  const hasDefault = /rel="alternate"\s+hrefLang="x-default"\s+href="https:\/\/[^"]+"/.test(
    r.text
  );
  report(hasFr && hasEn && hasDefault, `hreflang fr + en + x-default sur ${path}`);

  const ogLocale = r.text.match(/property="og:locale"\s+content="([^"]+)"/);
  report(
    !!ogLocale && ogLocale[1] === expectedLocale,
    `og:locale=${expectedLocale} sur ${path}`,
    ogLocale ? ogLocale[1] : 'absent'
  );

  const ogLocaleAlt = r.text.match(/property="og:locale:alternate"\s+content="([^"]+)"/);
  report(!!ogLocaleAlt, `og:locale:alternate présente sur ${path}`, ogLocaleAlt ? ogLocaleAlt[1] : 'absente');
}

console.log(`check:prod · ${APEX}\n`);

await checkApex();
await checkWwwRedirect();
await checkVercelUrl();
await checkMailto();
for (const path of PAGES) {
  await checkOgImageAbsolute(path);
  await checkI18n(path, 'en', 'en_US');
}
for (const path of FR_PAGES) {
  await checkOgImageAbsolute(path);
  await checkI18n(path, 'fr', 'fr_FR');
}

console.log();
if (failed) {
  console.error('check:prod : ÉCHEC — au moins un contrôle a échoué.');
  process.exit(1);
}
console.log('check:prod : conforme.');
