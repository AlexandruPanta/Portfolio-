/* Régression visuelle — DESIGN.md §18.
   Trois casses silencieuses en un seul projet (un var() résolu à la
   déclaration, un raccourci CSS qui écrase un token, et un @media
   entier disparu dans un edit) ont motivé ce filet : rien de tout ça
   n'a fait échouer un build, un lint ou un test existant.

   prefers-reduced-motion émulé pour des captures stables — sinon
   chaque exécution tomberait à un instant différent du tracé/reveal.
   Nécessite `npm run build` avant de lancer (playwright.config.js
   démarre `next start`, pas `next dev`). */

const { test, expect } = require('@playwright/test');

/* Anglais à la racine (defaultLocale), français sous /fr/ — voir
   next.config.js et DESIGN.md §19. */
const PAGES = [
  { path: '/', slug: 'home' },
  { path: '/work/zoecare', slug: 'zoecare' },
  { path: '/work/ab-tasty', slug: 'ab-tasty' },
  { path: '/fr', slug: 'home-fr' },
  { path: '/fr/work/zoecare', slug: 'zoecare-fr' },
  { path: '/fr/work/ab-tasty', slug: 'ab-tasty-fr' },
];

const WIDTHS = [375, 768, 1440];

for (const { path, slug } of PAGES) {
  for (const width of WIDTHS) {
    test(`${slug} @ ${width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(page).toHaveScreenshot(`${slug}-${width}.png`, { fullPage: true });
    });
  }
}
