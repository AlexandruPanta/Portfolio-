/* Toutes les chaînes de copie du site, en deux langues : fr et en.
   Rien de rédactionnel ne vit dans le JSX — un composant lit
   `copy.xxx`, jamais une chaîne en dur.

   Règle éditoriale (DESIGN.md §6) : labels meta en anglais, corps de
   texte en français côté fr. Les labels structurels (« Selected work »,
   « System », « Case study »…) sont déjà en anglais et NE CHANGENT PAS
   d'une langue à l'autre — ce n'est pas de la copie à traduire.

   Règles de traduction (côté en) : première personne, phrases courtes,
   même ton sec — ce n'est pas une réécriture. Chiffres, unités et
   flèches ne bougent pas. Noms propres et technos jamais traduits.

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
      body: [
        'Avant ZoeCare, la trace d’une chute, c’était une ligne saisie après coup, à la main, dans un tableur ou un formulaire. L’objectif était double : que les soignants et le cadre de santé soient alertés au moment où elle arrive, et qu’elle devienne une donnée qu’on peut suivre, établissement par établissement.',
      ],
    },
    {
      num: '02',
      title: 'La contrainte',
      body: [
        'Pas de caméra, et rien à porter pour le résident : des ESP32 mesurent les variations du signal Wi-Fi dans la pièce. C’est un signal très sensible, qui offre peu de paramètres exploitables — les faux positifs sont le vrai problème. La détection combine donc plusieurs étages de filtrage, un seuil de présence et un modèle entraîné.',
        'Le tout sous exigences SSI et RGPD : données sécurisées, chaque connexion journalisée. Et sans budget : uniquement de l’open source, sur des instances OVH.',
      ],
    },
    {
      num: '03',
      title: 'L’architecture',
      chain: ['Capteur', 'Passerelle', 'Données', 'Alerte', 'Soignant'],
      body: [
        'Le schéma montre le chemin d’une alerte, du capteur au soignant. J’ai construit cette chaîne seul, à trois exceptions près : l’émission des alertes depuis les capteurs, leur mise à jour, et le modèle de détection.',
        'Quand plusieurs chutes arrivent en même temps, les alertes sont retenues cinq secondes puis regroupées en une seule : le soignant reçoit un message clair, pas une rafale.',
        'Le serveur a été optimisé pour encaisser le volume de télémétrie. Cassandra absorbe le flux temps réel ; les données plus anciennes sont sauvegardées puis extraites vers un serveur physique au bureau, qui en garde une copie et libère l’espace en ligne. Les applications reposent sur Supabase, sous un modèle de sécurité en Row-Level Security.',
        'La flotte Raspberry Pi se met à jour à distance, en OTA signée SHA-256, conformément aux exigences SSI. Une mise à jour qui échoue revient d’elle-même à la version précédente : une passerelle en panne, c’est une zone qui n’est plus surveillée.',
        'Aucun port SSH n’est ouvert en entrée. La maintenance passe par un VPN WireGuard, les services tournent sous systemd derrière un reverse proxy Nginx en SSL/TLS, sur OVH.',
      ],
    },
    {
      num: '04',
      title: 'Le résultat',
      figures: [
        { value: '2', caption: 'EHPAD équipés · En production' },
        { value: '30', caption: 'Capteurs déployés' },
      ],
      body: ['Déployé et en production dans 2 EHPAD.'],
    },
  ],
  stack: [
    'Flutter', 'Node.js', 'TypeScript', 'Supabase', 'Cassandra', 'PostgreSQL',
    'React', 'Metabase', 'Raspberry Pi', 'ESP32', 'MQTT', 'Docker', 'Nginx',
    'systemd', 'WireGuard', 'OVH',
  ],
};

const zoecareEn = {
  slug: 'zoecare',
  index: '(01)',
  label: 'Case study',
  title: 'ZoeCare / ZoeFall',
  context: 'Apprenticeship · SATT Paris-Saclay · 2024 → 2026',
  tags: ['IoT', 'Embedded', 'Backend'],
  head: {
    title: 'ZoeCare / ZoeFall — Alex Panta',
    description:
      'IoT fall and presence detection platform for care homes: sensors, Raspberry Pi gateway, Hot/Cold data layer, multi-channel alert engine. Deployed and in production in 2 care homes.',
    path: '/work/zoecare',
    ogImage: '/og/zoecare-en.png',
  },
  sections: [
    {
      num: '01',
      title: 'The problem',
      body: [
        'Before ZoeCare, the record of a fall was a line entered after the fact, by hand, into a spreadsheet or a form. The goal was twofold: alert caregivers and the health manager the moment it happens, and turn it into data that can be tracked, facility by facility.',
      ],
    },
    {
      num: '02',
      title: 'The constraint',
      body: [
        'No camera, and nothing for the resident to wear: ESP32s measure Wi-Fi signal variations in the room. It’s a very sensitive signal that offers few usable parameters — false positives are the real problem. Detection therefore combines several filtering stages, a presence threshold, and a trained model.',
        'All of it under information security and GDPR requirements: secured data, every connection logged. And with no budget: open source only, on OVH instances.',
      ],
    },
    {
      num: '03',
      title: 'The architecture',
      chain: ['Sensor', 'Gateway', 'Data', 'Alert', 'Caregiver'],
      body: [
        'The diagram shows the path of an alert, from sensor to caregiver. I built this chain alone, with three exceptions: alert emission from the sensors, their update mechanism, and the detection model.',
        'When several falls happen at the same time, alerts are held for five seconds then grouped into one: the caregiver gets a clear message, not a flood.',
        'The server was optimized to absorb the telemetry volume. Cassandra takes the real-time stream; older data is backed up then extracted to a physical server at the office, which keeps a copy and frees up space online. The applications run on Supabase, under a Row-Level Security model.',
        'The Raspberry Pi fleet updates remotely, over SHA-256-signed OTA, per information security requirements. A failed update rolls back to the previous version on its own: a gateway down means a zone that’s no longer monitored.',
        'No SSH port is open inbound. Maintenance goes through a WireGuard VPN, services run under systemd behind an Nginx reverse proxy over SSL/TLS, on OVH.',
      ],
    },
    {
      num: '04',
      title: 'The result',
      figures: [
        { value: '2', caption: 'Care homes equipped · In production' },
        { value: '30', caption: 'Sensors deployed' },
      ],
      body: ['Deployed and in production in 2 care homes.'],
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
      body: [
        'Un client grand compte se plaignait de la latence du tag EmotionsAI sur ses sites en production. Au lancement, son code d’initialisation bloquait plus de 120 ms — autant de temps pendant lequel la page du client restait figée.',
      ],
    },
    {
      num: '02',
      title: 'La contrainte',
      body: [
        'Le score EmotionsAI devait rester strictement identique avant et après : la moindre différence aurait faussé les calculs qui en dépendent. Le code était ancien, et devait continuer de tourner sur les navigateurs anciens qu’il supportait. J’étais seul dessus.',
      ],
    },
    {
      num: '03',
      /* Chaîne de copie, pas une variation de gabarit : ce case study décrit
         une démarche de diagnostic, pas une architecture au sens de ZoeCare. */
      title: 'La méthode',
      body: [
        'Il a d’abord fallu reproduire le problème : DevTools en conditions 3G simulées, puis contrôle sur un outil de monitoring externe. Le temps se perdait sur une longue liste d’éléments que le tag parcourait en entier, alors que la plupart des cas ne s’appliquaient pas.',
        'Deux changements : restreindre la liste à ce qui peut réellement s’appliquer, et remplacer le parcours linéaire par une recherche en O(log n) — sans rien casser sur les navigateurs anciens. Le tag optimisé est parti en production.',
      ],
    },
    {
      num: '04',
      title: 'Le résultat',
      figures: [{ value: '−56%', caption: 'Blocking time · 120 ms → 53 ms' }],
      body: ['Blocking time du tag ramené de 120 ms à 53 ms.'],
    },
  ],
  stack: ['JavaScript', 'Python', 'Jupyter', 'BigQuery', 'SQL', 'Django', 'MySQL'],
};

const abTastyEn = {
  slug: 'ab-tasty',
  index: '(02)',
  label: 'Case study',
  title: 'AB Tasty — EmotionsAI',
  context: 'Internship · AB Tasty · 2023 → 2024',
  tags: ['Performance', 'JavaScript'],
  head: {
    title: 'AB Tasty — EmotionsAI — Alex Panta',
    description:
      'Optimization of the EmotionsAI tracking tag: blocking time cut from 120 ms to 53 ms on the critical load path of client sites.',
    path: '/work/ab-tasty',
    ogImage: '/og/ab-tasty-en.png',
  },
  sections: [
    {
      num: '01',
      title: 'The problem',
      body: [
        'A major account client was complaining about the EmotionsAI tag’s latency on their production sites. On load, its initialization code blocked for more than 120 ms — that much time during which the client’s page stayed frozen.',
      ],
    },
    {
      num: '02',
      title: 'The constraint',
      body: [
        'The EmotionsAI score had to stay strictly identical before and after: the smallest difference would have thrown off the calculations that depend on it. The code was old, and had to keep running on the old browsers it supported. I was alone on it.',
      ],
    },
    {
      num: '03',
      title: 'The method',
      body: [
        'First I had to reproduce the problem: DevTools under simulated 3G conditions, then cross-checked on an external monitoring tool. The time was being lost on a long list of elements the tag walked through in full, when most cases didn’t even apply.',
        'Two changes: narrow the list down to what can actually apply, and replace the linear scan with an O(log n) search — without breaking anything on the old browsers. The optimized tag shipped to production.',
      ],
    },
    {
      num: '04',
      title: 'The result',
      figures: [{ value: '−56%', caption: 'Blocking time · 120 ms → 53 ms' }],
      body: ['Tag blocking time cut from 120 ms to 53 ms.'],
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

const homelabEn = {
  title: 'Homelab',
  context: 'Personal project · Ongoing',
  tags: ['Debian', 'Network', 'VPN'],
};

export const fr = {
  /* Le site sera collé dans LinkedIn et dans des mails : l'aperçu est la
     première chose qu'un recruteur voit. */
  site: {
    name: 'Alex Panta',
    origin: 'https://alexpanta.dev',
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
    previewAlt: 'Aperçu —',
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
    email: 'alex@alexpanta.dev',
    emailLocal: 'alex',
    emailDomain: '@alexpanta.dev',
    status: 'Disponible — CDI',
    statusStrong: true,
    links: [
      { label: '+33 7 63 07 77 98', href: 'tel:+33763077798', tel: true },
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

export const en = {
  site: {
    name: 'Alex Panta',
    origin: 'https://alexpanta.dev',
    locale: 'en_US',
  },

  head: {
    title: 'Alex Panta — Full-stack developer, IoT & e-health',
    description: 'From the embedded sensor to the infrastructure that keeps it running in production.',
    path: '/',
    ogImage: '/og/home-en.png',
  },

  /* Labels structurels : déjà en anglais côté fr, donc identiques ici —
     ce n'est pas de la copie à traduire, voir DESIGN.md §6. */
  nav: {
    mark: 'Alex Panta',
    sectionsLabel: 'Sections',
    skip: 'Skip to content',
    items: [
      { index: '(01)', label: 'Selected work', href: '#work' },
      { index: '(02)', label: 'System', href: '#system' },
      { index: '(03)', label: 'Contact', href: '#contact' },
    ],
  },

  loader: { label: 'Loading', index: '(00)' },

  hero: {
    index: '(00)',
    label: 'Alex Panta',
    name: 'Alex Panta',
    line: 'From the embedded sensor to the infrastructure that keeps it running in production.',
    foot: 'Paris · 2026',
  },

  work: {
    index: '(01)',
    label: 'Selected work',
    intro:
      'Two years in production, a performance internship, and the machine I learned infrastructure on.',
    previewAlt: 'Preview —',
    projects: [
      {
        num: '01',
        title: zoecareEn.title,
        href: `/work/${zoecareEn.slug}`,
        context: zoecareEn.context,
        tags: zoecareEn.tags,
        summary: 'IoT fall-detection platform.',
        figure: '2',
        figureCaption: 'Care homes equipped · In production',
        preview: null,
      },
      {
        num: '02',
        title: abTastyEn.title,
        href: `/work/${abTastyEn.slug}`,
        context: abTastyEn.context,
        tags: abTastyEn.tags,
        summary: 'EmotionsAI tracking tag. Blocking time cut from 120 ms to 53 ms.',
        figure: '−56%',
        figureCaption: 'Blocking time · 120 ms → 53 ms',
        preview: null,
      },
      {
        num: '03',
        title: homelabEn.title,
        href: null,
        context: homelabEn.context,
        tags: homelabEn.tags,
        summary:
          'A 2009 iMac running Debian: media, network, VPN. The infrastructure I run in production today, I learned on this machine.',
        figure: '17 years',
        figureCaption: 'In service since 2009',
        preview: null,
      },
    ],
  },

  system: {
    index: '(02)',
    label: 'System',
    intro:
      'Everything below comes from the three projects above. Nothing here that hasn’t run in one of them.',
    groups: [
      { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Dart'] },
      { label: 'Front', items: ['React', 'Flutter'] },
      { label: 'Backend', items: ['Node.js', 'Supabase'] },
      { label: 'Data', items: ['PostgreSQL', 'Cassandra', 'BigQuery', 'Metabase'] },
      { label: 'Infra', items: ['Docker', 'Debian', 'Nginx', 'systemd', 'OVH', 'SSL/TLS', 'WireGuard'] },
      { label: 'Embedded', items: ['Raspberry Pi', 'ESP32', 'MQTT', 'OTA signed SHA-256'] },
    ],
  },

  contact: {
    index: '(03)',
    label: 'Contact',
    email: 'alex@alexpanta.dev',
    emailLocal: 'alex',
    emailDomain: '@alexpanta.dev',
    status: 'Available — full-time, permanent',
    statusStrong: true,
    links: [
      { label: '+33 7 63 07 77 98', href: 'tel:+33763077798', tel: true },
      { label: 'linkedin.com/in/alexandru-panta', href: 'https://linkedin.com/in/alexandru-panta' },
      { label: 'github.com/AlexandruPanta', href: 'https://github.com/AlexandruPanta' },
    ],
  },

  /* Footer explicitement laissé inchangé (consigne : « footer inchangé »). */
  footer: {
    line: 'Alex Panta · Paris · 2026',
    legalName: '© Alexandru Panta',
  },

  caseStudy: {
    back: 'Back to projects',
    stackLabel: 'Stack',
    stackNum: '05',
    todoMark: 'TODO: to write',
  },

  caseStudies: { zoecare: zoecareEn, abTasty: abTastyEn },

  glyph: { dot: ' · ', arrow: '→' },
};

export default fr;
