import '../styles/globals.css';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Alexandru Panta Portfolio</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
