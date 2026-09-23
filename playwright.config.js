// Régression visuelle. Voir DESIGN.md §18 (filets de sécurité).
//
// Utilise le Chrome déjà installé (`channel: 'chrome'`), pas le
// Chromium propre à Playwright : rien à télécharger, même moteur de
// rendu que le reste des vérifications de ce projet (Lighthouse,
// scripts/check-reduced-motion.mjs).
//
// Déterministe sur cette machine seulement — les références sont
// générées ici, en local. Les régénérer ailleurs (autre OS, CI) sans
// les recommitter ferait échouer la comparaison sur un rendu de police
// différent, pas sur une vraie régression.

const { defineConfig, devices } = require('@playwright/test');

const PORT = 3013;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  /* Pas de maxDiffPixelRatio : sur une capture pleine page de plusieurs
     milliers de pixels de haut, un pourcentage de tolérance masque un
     changement localisé — une seule ligne de texte qui change de
     couleur ne pèse rien face au total de pixels de la page. Vérifié :
     avec 0.01 (1%), un --accent passé au rouge sur toute l'adresse de
     contact passait inaperçu. Le défaut de Playwright (diff par pixel,
     threshold 0.2, aucune tolérance de compte) est le bon calibrage. */
  use: {
    baseURL: BASE_URL,
    channel: 'chrome',
    trace: 'off',
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
});
