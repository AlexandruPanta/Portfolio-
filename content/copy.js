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
    intro:
      'Deux ans en production, un stage de performance, et la machine sur laquelle j’ai appris l’infra.',
    projects: [
      {
        num: '01',
        title: 'ZoeCare / ZoeFall',
        href: '/work/zoecare',
        context: 'Alternance · SATT Paris-Saclay · 2024 → 2026',
        tags: ['IoT', 'Embarqué', 'Backend'],
        summary: 'Plateforme IoT de détection de chute.',
        figure: '2',
        figureCaption: 'EHPAD équipés · En production',
        preview: 'aperçu ZoeCare',
      },
      {
        num: '02',
        title: 'AB Tasty — EmotionsAI',
        href: null,
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
        href: null,
        context: 'Projet personnel · En cours',
        tags: ['Debian', 'Réseau', 'VPN'],
        summary:
          'iMac 2009 en Debian : média, réseau, VPN. L’infra que je fais aujourd’hui en production, je l’ai apprise dessus.',
        figure: '17 ans',
        figureCaption: 'En service depuis 2009',
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

  /* Case studies. Le contenu factuel vient du CV d'Alex ; les `todo` sont
     des phrases qu'il écrit lui-même, elles ne se rédigent pas à sa place.

     CONFIDENTIALITÉ — un CV se transmet, un site se publie. Aucun
     établissement, aucun résident, aucun système téléphonique client
     n'est nommé. On reste au niveau des briques d'infra standard. */
  caseStudies: {
    zoecare: {
      slug: 'zoecare',
      index: '(01)',
      label: 'Case study',
      title: 'ZoeCare / ZoeFall',
      context: 'Alternance · SATT Paris-Saclay · 2024 → 2026',
      tags: ['IoT', 'Embarqué', 'Backend'],
      head: {
        title: 'ZoeCare / ZoeFall — Alex Panta',
        description:
          'Plateforme IoT de détection de chute et de présence en EHPAD : capteurs, passerelle Raspberry Pi, couche données Hot/Cold, moteur d’alerte multi-canal. Déployée en production dans 2 EHPAD.',
      },
      back: 'Retour aux projets',

      sections: [
        {
          num: '01',
          title: 'Le problème',
          todo: 'à écrire — détection de chute et de présence en EHPAD.',
        },
        {
          num: '02',
          title: 'La contrainte',
          todo:
            'à écrire — ce qui rendait la solution non évidente (multi-pièces, faux positifs, exigences SSI).',
        },
        {
          num: '03',
          title: 'L’architecture',
          diagram: true,
          body: [
            'Capteurs → passerelle Raspberry Pi → MQTT → couche données Hot/Cold (Cassandra temps réel / Supabase persistant, RLS) → moteur d’alerte multi-canal avec routage par zone et par soignant → applications mobiles Flutter + dashboards React/Metabase.',
            'Infra OVH : Nginx reverse proxy SSL/TLS, services en systemd, VPN WireGuard pour la maintenance (SSH entrant supprimé).',
            'Flotte Raspberry Pi mise à jour en OTA signée SHA-256 avec rollback automatique.',
          ],
        },
        {
          num: '04',
          title: 'Le résultat',
          figure: '2',
          figureCaption: 'EHPAD équipés · En production',
          body: ['Déployé et en production dans 2 EHPAD.'],
          todo: 'un second chiffre si tu en as un de publiable (réduction de faux positifs, temps de réponse).',
        },
      ],

      stack: {
        num: '05',
        title: 'Stack',
        items: [
          'Flutter', 'Node.js', 'TypeScript', 'Supabase', 'Cassandra', 'PostgreSQL',
          'React', 'Metabase', 'Raspberry Pi', 'ESP32', 'MQTT', 'Docker', 'Nginx',
          'systemd', 'WireGuard', 'OVH',
        ],
      },

      /* Schéma : une seule ligne horizontale. L'accent ne marque que le
         chemin critique — celui qui doit tenir pour qu'une alerte parte
         du capteur et arrive au soignant. */
      diagram: {
        caption:
          'Chemin critique : capteur → passerelle → données → alerte → soignant.',
        nodes: ['Capteur', 'Passerelle', 'Données', 'Alerte', 'Soignant'],
        alt:
          'Chaîne en cinq étapes : capteur, passerelle, données, alerte, soignant.',
      },
    },
  },

  footer: {
    /* Libellé de fuseau, pas un décalage : UTC+2 devient faux fin octobre. */
    timezone: 'Paris · CET',
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
