import Head from 'next/head';
import { useRouter } from 'next/router';
import { fr, en } from '../content/copy';

const copyByLocale = { fr, en };
/* fr = x-default : une URL partagée sans langue explicite doit résoudre
   sur le français, jamais sur une redirection selon Accept-Language
   (localeDetection: false dans next.config.js). */
const OTHER_LOCALE = { fr: 'en', en: 'fr' };

/* Balises de partage, identiques pour la home et les case studies.
   `path` est le chemin SANS préfixe de langue (ex. '/', '/work/zoecare') —
   identique dans copy.fr et copy.en pour une même page : le préfixe
   /en est ajouté ici, pas dans le contenu.

   L'origine reste un TODO tant que le domaine n'est pas fixé : LinkedIn
   et la plupart des clients mail refusent une og:image relative. Tant
   qu'elle n'est pas renseignée, on n'émet ni URL canonique ni og:url —
   plutôt rien qu'une fausse. */
export default function Meta({ title, description, path, ogImage }) {
  const { locale } = useRouter();
  const current = locale === 'en' ? 'en' : 'fr';
  const other = OTHER_LOCALE[current];

  const { origin, name } = fr.site;
  const { locale: ogLocale } = copyByLocale[current].site;
  const { locale: ogLocaleOther } = copyByLocale[other].site;
  const resolved = origin.startsWith('TODO:') ? null : origin.replace(/\/$/, '');

  const withLocale = (loc) => (loc === 'en' ? `/en${path}` : path);
  const url = resolved ? `${resolved}${withLocale(current)}` : null;
  const urlFr = resolved ? `${resolved}${withLocale('fr')}` : null;
  const urlEn = resolved ? `${resolved}${withLocale('en')}` : null;
  const image = resolved ? `${resolved}${ogImage}` : ogImage;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      {urlFr ? <link rel="alternate" hrefLang="fr" href={urlFr} /> : null}
      {urlEn ? <link rel="alternate" hrefLang="en" href={urlEn} /> : null}
      {urlFr ? <link rel="alternate" hrefLang="x-default" href={urlFr} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleOther} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      {url ? <meta property="og:url" content={url} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
