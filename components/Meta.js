import Head from 'next/head';
import copy from '../content/copy';

/* Balises de partage, identiques pour la home et les case studies.

   L'origine reste un TODO tant que le domaine n'est pas fixé : LinkedIn
   et la plupart des clients mail refusent une og:image relative. Tant
   qu'elle n'est pas renseignée, on n'émet ni URL canonique ni og:url —
   plutôt rien qu'une fausse. */
export default function Meta({ title, description, path, ogImage }) {
  const { origin, name, locale } = copy.site;
  const resolved = origin.startsWith('TODO:') ? null : origin.replace(/\/$/, '');
  const url = resolved ? `${resolved}${path}` : null;
  const image = resolved ? `${resolved}${ogImage}` : ogImage;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content={locale} />
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
