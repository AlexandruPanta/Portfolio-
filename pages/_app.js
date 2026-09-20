import '../styles/tokens.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F4F2EE" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
