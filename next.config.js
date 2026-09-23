/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  i18n: {
    locales: ['fr', 'en'],
    /* Anglais à la racine : cible internationale/grands comptes plutôt
       que le seul marché CDI français — voir DESIGN.md §19. Le français
       vit sous /fr/. */
    defaultLocale: 'en',
    /* Une URL partagée doit toujours rendre la même page, pour le
       recruteur comme pour le crawler — pas de redirection selon
       Accept-Language. */
    localeDetection: false,
  },
};

module.exports = nextConfig;
