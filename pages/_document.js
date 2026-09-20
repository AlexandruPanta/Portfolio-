import { Html, Head, Main, NextScript } from 'next/document';

/* La classe `js` est posée avant la peinture : elle seule autorise les
   états de départ masqués (data-reveal, data-trace) et l'affichage du
   loader. Sans JavaScript, rien n'est caché et la page reste entière. */
const JS_GATE = 'document.documentElement.classList.add("js")';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/JetBrainsMono-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: JS_GATE }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
