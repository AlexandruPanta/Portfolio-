/* Toutes les chaînes de copie du site, en un seul endroit.
   Rien de rédactionnel ne vit dans le JSX : une version EN s'ajoute ici
   en dupliquant la clé de langue, sans toucher un composant.

   Règle éditoriale (DESIGN.md §6) : labels meta en anglais, corps de
   texte en français. Les labels ne se traduisent pas — ils sont déjà
   dans la langue du système. */

export const fr = {
  head: {
    title: 'Alex Panta — Systèmes connectés, du capteur à la production',
    description:
      'Alex Panta, développeur full-stack orienté systèmes : IoT et embarqué, backend, sécurité. Plateforme IoT de détection de chute, optimisation de performance, infrastructure auto-hébergée.',
  },

  nav: {
    mark: 'Alex Panta',
    sectionsLabel: 'Sections',
    skip: 'Aller au contenu',
  },

  loader: {
    label: 'Chargement',
    index: '(00)',
  },

  hero: {
    index: '(00)',
    label: 'Alex Panta',
    name: 'Alex Panta',
    line: 'Du capteur embarqué à l’infrastructure qui le tient en production.',
    foot: 'Paris · 2026',
  },

  work: {
    index: '(01)',
    label: 'Selected work',
    intro: 'Trois systèmes, trois couches : embarqué, performance web, infrastructure.',
    projects: [
      {
        num: '01',
        title: 'ZoeCare / ZoeFall',
        context: 'Alternance · SATT Paris-Saclay · 2024 → En cours',
        tags: ['IoT', 'Embarqué', 'Backend'],
        summary: 'Plateforme IoT de détection de chute.',
        figure: null,
        figureCaption: null,
        preview: 'aperçu ZoeCare',
      },
      {
        num: '02',
        title: 'AB Tasty — EmotionsAI',
        context: 'Stage · AB Tasty · 2023 → 2024',
        tags: ['Performance', 'JavaScript'],
        summary: 'Tag de tracking EmotionsAI. Blocking time ramené de 120 ms à 53 ms.',
        figure: '−56%',
        figureCaption: 'Blocking time · 120 ms → 53 ms',
        preview: 'aperçu AB Tasty',
      },
      {
        num: '03',
        title: 'Homelab',
        context: 'Projet personnel · En cours',
        tags: ['Debian', 'Réseau', 'VPN'],
        summary: 'iMac 2009 recyclé en serveur Debian : média, réseau, VPN.',
        figure: null,
        figureCaption: null,
        preview: 'aperçu Homelab',
      },
    ],
  },

  /* Étape 6. Stocké ici dès maintenant : la chaîne est figée, seule la
     mise en page reste à écrire. La césure est autorisée au @ — voir
     le gabarit `adresse` dans /styleguide. */
  contact: {
    index: '(03)',
    label: 'Contact',
    email: 'alexandru.panta2003@gmail.com',
    emailLocal: 'alexandru.panta2003',
    emailDomain: '@gmail.com',
  },

  footer: {
    timezone: 'Paris — UTC+2',
    legalName: 'Alexandru Panta',
  },

  /* Séparateur des listes mono, et flèche de progression. Une seule
     forme pour les deux usages : contexte de projet et bloc chiffres. */
  glyph: {
    dot: ' · ',
    arrow: '→',
  },
};

export default fr;
