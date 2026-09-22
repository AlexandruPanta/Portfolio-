/* Vérifie `prefers-reduced-motion: reduce` par bascule réelle.

   playwright-core pilote le Chrome déjà installé (aucun navigateur
   téléchargé) et `emulateMedia` agit sur matchMedia comme sur le CSS —
   c'est donc le vrai chemin de code, pas une simulation.

   Ce qu'on exige, sur chaque page :
     - zéro élément masqué, à n'importe quel moment
     - zéro animation et zéro transition en cours
     - le loader n'apparaît jamais : il ne doit pas retarder le contenu
     - V1.1 : la chaîne ZoeCare est entièrement tracée au repos, le
       hero est à sa graisse finale (500) sans jamais passer par 300,
       et un clic sur un projet ne déclenche aucune transition de page
       (le filet 1px de balayage ne doit jamais apparaître)

   Usage :  node scripts/check-reduced-motion.mjs [origine]
*/

import { chromium } from 'playwright-core';

const ORIGIN = process.argv[2] || 'http://localhost:3012';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGES = ['/', '/work/zoecare'];

const probe = () => {
  const masked = [
    ...document.querySelectorAll(
      '[data-reveal],[data-reveal-lines],[data-trace],[data-chain-edge],[data-chain-connector]'
    ),
  ]
    .filter((el) => {
      const s = getComputedStyle(el);
      const t = s.transform;
      return s.opacity !== '1' || (t !== 'none' && !t.startsWith('matrix(1, 0, 0, 1'));
    })
    .map((el) => (el.textContent || el.dataset.chainEdge || '(filet)').trim().slice(0, 40));

  const pulse = document.querySelector('[data-chain-pulse]');
  const heroWght = document.querySelector('h1')
    ? getComputedStyle(document.querySelector('h1')).getPropertyValue('--wght').trim()
    : null;

  return {
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    masked,
    animations: document.getAnimations().filter((a) => a.playState === 'running').length,
    loader: !!document.querySelector('[class*=loader]'),
    textLength: document.body.innerText.trim().length,
    pulseOpacity: pulse ? getComputedStyle(pulse).opacity : null,
    heroWght,
  };
};

const browser = await chromium.launch({ executablePath: CHROME });
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

let failed = false;

for (const path of PAGES) {
  await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });

  const samples = [];
  for (let i = 0; i < 12; i++) {
    samples.push(await page.evaluate(probe));
    await page.waitForTimeout(150);
  }
  // un défilement complet, pour déclencher tout ce qui attend le scroll
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  samples.push(await page.evaluate(probe));

  const worstMasked = Math.max(...samples.map((s) => s.masked.length));
  const worstAnim = Math.max(...samples.map((s) => s.animations));
  const loaderSeen = samples.some((s) => s.loader);
  const emulated = samples.every((s) => s.reduced);
  const text = samples[0].textLength;
  const pulseEverVisible = samples.some((s) => s.pulseOpacity === '1');
  const heroWrongWeight = samples.some((s) => s.heroWght && s.heroWght !== '500');

  const ok =
    emulated &&
    worstMasked === 0 &&
    worstAnim === 0 &&
    !loaderSeen &&
    text > 500 &&
    !pulseEverVisible &&
    !heroWrongWeight;
  if (!ok) failed = true;

  console.log(`${ok ? '  OK  ' : '  ÉCHEC'} ${path}`);
  console.log(
    `         média émulé : ${emulated} · masqués : ${worstMasked} · animations : ${worstAnim} · loader vu : ${loaderSeen} · texte : ${text} car.`
  );
  console.log(
    `         impulsion jamais visible : ${!pulseEverVisible} · hero toujours à 500 : ${!heroWrongWeight}`
  );
  if (worstMasked) console.log(`         ${samples.find((s) => s.masked.length)?.masked.join(' | ')}`);
}

/* Transition de page : sous mouvement réduit, aucun filet de balayage
   ne doit jamais apparaître — la navigation doit être instantanée. */
await page.goto(ORIGIN + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  window.__sweepSeen = false;
  new MutationObserver((muts) => {
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.style && n.style.position === 'fixed' && n.style.width === '1px') {
          window.__sweepSeen = true;
        }
      }
    }
  }).observe(document.body, { childList: true });
});
const link = page.locator('a[href="/work/zoecare"]').first();
await link.click();
await page.waitForTimeout(1200);
const sweepSeen = await page.evaluate(() => window.__sweepSeen);
const onCaseStudy = page.url().includes('/work/zoecare');
const transitionOk = !sweepSeen && onCaseStudy;
if (!transitionOk) failed = true;
console.log(`${transitionOk ? '  OK  ' : '  ÉCHEC'} transition de page (clic projet)`);
console.log(
  `         filet de balayage jamais créé : ${!sweepSeen} · navigation effectuée : ${onCaseStudy}`
);

await browser.close();
console.log(failed ? '\nreduced-motion : ÉCHEC' : '\nreduced-motion : conforme sur toutes les pages');
process.exit(failed ? 1 : 0);
