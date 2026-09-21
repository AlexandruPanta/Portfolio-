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
      body: [
        'Capteurs → passerelle Raspberry Pi → MQTT → couche données Hot/Cold (Cassandra temps réel / Supabase persistant, RLS) → moteur d’alerte multi-canal avec routage par zone et par soignant → applications mobiles Flutter + dashboards React/Metabase.',
        'Infra OVH : Nginx reverse proxy SSL/TLS, services en systemd, VPN WireGuard pour la maintenance (SSH entrant supprimé).',
        'Flotte Raspberry Pi mise à jour en OTA signée SHA-256 avec rollback automatique.',
      ],
      diagram: {
        caption: 'Chemin critique : capteur → passerelle → données → alerte → soignant.',
        nodes: ['Capteur', 'Passerelle', 'Données', 'Alerte', 'Soignant'],
      },
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
      body: [
        'Tag de tracking EmotionsAI, sur le chemin critique du chargement des pages clientes.',
      ],
      todo:
        'à écrire — la chaîne exacte du tag, si elle est publiable. Sans elle, pas de schéma : le gabarit en accepte un, je ne l’invente pas.',
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

const homelab = {
  slug: 'homelab',
  index: '(03)',
  label: 'Case study',
  title: 'Homelab',
  context: 'Projet personnel · En cours',
  tags: ['Debian', 'Réseau', 'VPN'],
  head: {
    title: 'Homelab — Alex Panta',
    description:
      'iMac 2009 en serveur Debian : média, réseau, VPN. L’infrastructure que je fais aujourd’hui en production, je l’ai apprise dessus.',
  },
  sections: [
    {
      num: '01',
      title: 'Le problème',
      todo: 'à écrire — pourquoi recycler cette machine plutôt qu’en louer une.',
    },
    {
      num: '02',
      title: 'La contrainte',
      todo: 'à écrire — ce qu’impose une machine de 2009.',
    },
    {
      num: '03',
      title: 'L’architecture',
      body: [
        'iMac 2009 sous Debian. Trois services : média, réseau, VPN.',
      ],
      todo:
        'à écrire — comment les services sont arrangés. Ta consigne n’en donnait pas et je n’invente pas de topologie.',
    },
    {
      num: '04',
      title: 'Le résultat',
      figure: '17 ans',
      figureCaption: 'En service depuis 2009',
      body: [
        'L’infrastructure que je fais aujourd’hui en production, je l’ai apprise dessus.',
      ],
      todo: 'à écrire — ce que la machine tient réellement aujourd’hui.',
    },
  ],
  stack: ['Debian', 'Nginx', 'systemd', 'WireGuard', 'Docker'],
};

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
        preview: 'aperçu ZoeCare',
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
        preview: 'aperçu AB Tasty',
      },
      {
        num: '03',
        title: homelab.title,
        href: `/work/${homelab.slug}`,
        context: homelab.context,
        tags: homelab.tags,
        summary:
          'iMac 2009 en Debian : média, réseau, VPN. L’infra que je fais aujourd’hui en production, je l’ai apprise dessus.',
        figure: '17 ans',
        figureCaption: 'En service depuis 2009',
        preview: 'aperçu Homelab',
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
      'Ce qui suit sort des trois pages ci-dessus. Rien n’y figure qui n’ait tourné dans un des trois projets.',
    groups: [
      { label: 'Langages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Dart'] },
      { label: 'Front', items: ['React', 'Next.js', 'Flutter'] },
      { label: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'Cassandra', 'Metabase'] },
      { label: 'Infra', items: ['Docker', 'Linux', 'Nginx', 'systemd', 'OVH', 'SSL/TLS', 'WireGuard'] },
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
    links: [
      { label: 'linkedin.com/in/alexandru-panta', href: 'https://linkedin.com/in/alexandru-panta' },
      { label: 'github.com/AlexandruPanta', href: 'https://github.com/AlexandruPanta' },
    ],
  },

  footer: {
    line: 'Alex Panta · Paris · 2026',
    legalName: 'Alexandru Panta',
  },

  caseStudy: {
    back: 'Retour aux projets',
    stackLabel: 'Stack',
    stackNum: '05',
    todoMark: 'TODO: à écrire',
  },

  caseStudies: { zoecare, abTasty, homelab },

  /* Séparateur des listes mono, et flèche de progression. Une seule
     forme pour les deux usages : contexte de projet et bloc chiffres. */
  glyph: { dot: ' · ', arrow: '→' },
};

export default fr;
