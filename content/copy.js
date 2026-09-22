/* Toutes les chaînes de copie du site, en un seul endroit.
   Rien de rédactionnel ne vit dans le JSX : une version EN s'ajoute ici
   en dupliquant la clé de langue, sans toucher un composant.

   Règle éditoriale (DESIGN.md §6) : labels meta en anglais, corps de
   texte en français. Les labels ne se traduisent pas — ils sont déjà
   dans la langue du système.

   CONFIDENTIALITÉ — un CV se transmet, un site se publie. Aucun
   établissement, aucun résident, aucun système téléphonique client
   n'est nommé. On reste au niveau des briques d'infra standard. */

const zoecare = {
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
    path: '/work/zoecare',
    ogImage: '/og/zoecare.png',
  },
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
      chain: ['Capteur', 'Passerelle', 'Données', 'Alerte', 'Soignant'],
      body: [
        'Le schéma montre le chemin d’une alerte, du capteur au soignant. Trois décisions le tiennent.',
        'Les données capteurs sont stockées en deux niveaux : Cassandra absorbe le flux temps réel, Supabase garde ce qui doit durer, sous un modèle de sécurité en Row-Level Security. C’est un arbitrage coût/performance, pas une préférence d’outil.',
        'La flotte Raspberry Pi se met à jour à distance, en OTA signée SHA-256, conformément aux exigences SSI. Une mise à jour qui échoue revient d’elle-même à la version précédente : une passerelle en panne, c’est une zone qui n’est plus surveillée.',
        'Aucun port SSH n’est ouvert en entrée. La maintenance passe par un VPN WireGuard, les services tournent sous systemd derrière un reverse proxy Nginx en SSL/TLS, sur OVH.',
      ],
    },
    {
      num: '04',
      title: 'Le résultat',
      figure: '2',
      figureCaption: 'EHPAD équipés · En production',
      body: ['Déployé et en production dans 2 EHPAD.'],
    },
  ],
  stack: [
    'Flutter', 'Node.js', 'TypeScript', 'Supabase', 'Cassandra', 'PostgreSQL',
    'React', 'Metabase', 'Raspberry Pi', 'ESP32', 'MQTT', 'Docker', 'Nginx',
    'systemd', 'WireGuard', 'OVH',
  ],
};

const abTasty = {
  slug: 'ab-tasty',
  index: '(02)',
  label: 'Case study',
  title: 'AB Tasty — EmotionsAI',
  context: 'Stage · AB Tasty · 2023 → 2024',
  tags: ['Performance', 'JavaScript'],
  head: {
    title: 'AB Tasty — EmotionsAI — Alex Panta',
    description:
      'Optimisation du tag de tracking EmotionsAI : blocking time ramené de 120 ms à 53 ms sur le chemin critique de chargement des sites clients.',
    path: '/work/ab-tasty',
    ogImage: '/og/ab-tasty.png',
  },
  sections: [
    {
      num: '01',
      title: 'Le problème',
      todo: 'à écrire — temps de blocage du tag sur les sites clients.',
    },
    {
      num: '02',
      title: 'La contrainte',
      todo: 'à écrire — ce qui rendait la solution non évidente.',
    },
    {
      num: '03',
      title: 'L’architecture',
      todo:
        'à écrire — le chemin critique du chargement. Pas de chaîne fournie, donc pas de schéma : le gabarit en accepte un, il ne l’invente pas.',
    },
    {
      num: '04',
      title: 'Le résultat',
      figure: '−56%',
      figureCaption: 'Blocking time · 120 ms → 53 ms',
      body: ['Blocking time du tag ramené de 120 ms à 53 ms.'],
    },
  ],
  stack: ['JavaScript', 'Python', 'Jupyter', 'BigQuery', 'SQL', 'Django', 'MySQL'],
};

/* Homelab n'a pas de case study : quatre sections sur cinq seraient des
   TODO, il n'y a pas de page à écrire. Seul ce que la ligne de la home
   utilise subsiste. */
const homelab = {
  title: 'Homelab',
  context: 'Projet personnel · En cours',
  tags: ['Debian', 'Réseau', 'VPN'],
};

export const fr = {
  /* Le site sera collé dans LinkedIn et dans des mails : l'aperçu est la
     première chose qu'un recruteur voit. */
  site: {
    name: 'Alex Panta',
    /* TODO: DOMAINE — l'URL canonique et les og:image absolues en
       dépendent. LinkedIn refuse une og:image relative. */
    origin: 'TODO: DOMAINE',
    locale: 'fr_FR',
  },

  head: {
    /* Le rôle doit être lisible avant le clic : le titre le porte, la
       description reprend la ligne de positionnement du hero. */
    title: 'Alex Panta — Développeur full-stack, IoT & e-santé',
    description: 'Du capteur embarqué à l’infrastructure qui le tient en production.',
    path: '/',
    ogImage: '/og/home.png',
  },

  nav: {
    mark: 'Alex Panta',
    sectionsLabel: 'Sections',
    skip: 'Aller au contenu',
    items: [
      { index: '(01)', label: 'Selected work', href: '#work' },
      { index: '(02)', label: 'System', href: '#system' },
      { index: '(03)', label: 'Contact', href: '#contact' },
    ],
  },

  loader: { label: 'Chargement', index: '(00)' },

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
        title: zoecare.title,
        href: `/work/${zoecare.slug}`,
        context: zoecare.context,
        tags: zoecare.tags,
        summary: 'Plateforme IoT de détection de chute.',
        figure: '2',
        figureCaption: 'EHPAD équipés · En production',
        /* Pas d'image : pas de révélation au survol. La ligne tient
           avec son chiffre. */
        preview: null,
      },
      {
        num: '02',
        title: abTasty.title,
        href: `/work/${abTasty.slug}`,
        context: abTasty.context,
        tags: abTasty.tags,
        summary: 'Tag de tracking EmotionsAI. Blocking time ramené de 120 ms à 53 ms.',
        figure: '−56%',
        figureCaption: 'Blocking time · 120 ms → 53 ms',
        /* Pas d'image : pas de révélation au survol. La ligne tient
           avec son chiffre. */
        preview: null,
      },
      {
        num: '03',
        title: homelab.title,
        href: null,
        context: homelab.context,
        tags: homelab.tags,
        summary:
          'iMac 2009 en Debian : média, réseau, VPN. L’infra que je fais aujourd’hui en production, je l’ai apprise dessus.',
        figure: '17 ans',
        figureCaption: 'En service depuis 2009',
        preview: null,
      },
    ],
  },

  /* (02) SYSTEM — seule section inversée du site.
     RÈGLE : la section ne liste QUE ce qui apparaît dans un case study.
     Pas de recopie de CV, pas de techno sans preuve derrière. */
  system: {
    index: '(02)',
    label: 'System',
    intro:
      'Ce qui suit sort des trois projets ci-dessus. Rien n’y figure qui n’ait tourné dans l’un d’eux.',
    groups: [
      { label: 'Langages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Dart'] },
      { label: 'Front', items: ['React', 'Flutter'] },
      { label: 'Backend', items: ['Node.js', 'Supabase'] },
      { label: 'Données', items: ['PostgreSQL', 'Cassandra', 'BigQuery', 'Metabase'] },
      { label: 'Infra', items: ['Docker', 'Debian', 'Nginx', 'systemd', 'OVH', 'SSL/TLS', 'WireGuard'] },
      { label: 'Embarqué', items: ['Raspberry Pi', 'ESP32', 'MQTT', 'OTA signé SHA-256'] },
    ],
  },

  /* (03) CONTACT — l'adresse est le SEUL élément du site en --accent au repos. */
  contact: {
    index: '(03)',
    label: 'Contact',
    email: 'alexandru.panta2003@gmail.com',
    emailLocal: 'alexandru.panta2003',
    emailDomain: '@gmail.com',
    status: 'Disponible — CDI',
    statusStrong: true,
    links: [
      { label: 'linkedin.com/in/alexandru-panta', href: 'https://linkedin.com/in/alexandru-panta' },
      { label: 'github.com/AlexandruPanta', href: 'https://github.com/AlexandruPanta' },
    ],
  },

  footer: {
    line: 'Alex Panta · Paris · 2026',
    legalName: '© Alexandru Panta',
  },

  caseStudy: {
    back: 'Retour aux projets',
    stackLabel: 'Stack',
    stackNum: '05',
    todoMark: 'TODO: à écrire',
  },

  /* Homelab n'a pas de case study : quatre sections sur cinq seraient
     des TODO. La ligne reste sur la home, sans lien. */
  caseStudies: { zoecare, abTasty },

  /* Séparateur des listes mono, et flèche de progression. Une seule
     forme pour les deux usages : contexte de projet et bloc chiffres. */
  glyph: { dot: ' · ', arrow: '→' },
};

export default fr;
