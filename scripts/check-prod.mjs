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
const PAGES = ['/', '/work/zoecare', '/work/ab-tasty'];

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

console.log(`check:prod · ${APEX}\n`);

await checkApex();
await checkWwwRedirect();
await checkVercelUrl();
await checkMailto();
for (const path of PAGES) {
  await checkOgImageAbsolute(path);
}

console.log();
if (failed) {
  console.error('check:prod : ÉCHEC — au moins un contrôle a échoué.');
  process.exit(1);
}
console.log('check:prod : conforme.');
