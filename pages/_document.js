import Document, { Html, Head, Main, NextScript } from 'next/document';

/* La classe `js` est posée avant la peinture : elle seule autorise les
   états de départ masqués (data-reveal, data-trace) et l'affichage du
   loader. Sans JavaScript, rien n'est caché et la page reste entière. */
const JS_GATE = 'document.documentElement.classList.add("js")';

/* lang doit suivre la locale active — un Document par défaut (fonction)
   n'a pas accès à ctx.locale, d'où la classe et getInitialProps. */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    const { locale } = this.props;
    return (
      <Html lang={locale || 'en'}>
        <Head>
          <meta charSet="utf-8" />
          {/* Le filet 1px du site, réduit à 32px. */}
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {/* next/font précharge les woff2 lui-même : pas de <link> manuel. */}
          <script dangerouslySetInnerHTML={{ __html: JS_GATE }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
