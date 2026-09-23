/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    /* Une URL partagée doit toujours rendre la même page, pour le
       recruteur comme pour le crawler — pas de redirection selon
       Accept-Language. */
    localeDetection: false,
  },
};

module.exports = nextConfig;
