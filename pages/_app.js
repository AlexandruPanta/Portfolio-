import '../styles/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
  useEffect(() => {
    const els = document.querySelectorAll('.revealOnScroll');
    if (!('IntersectionObserver' in window) || els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Alexandru Panta — Full-Stack Developer · IoT, Systems & Security</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
