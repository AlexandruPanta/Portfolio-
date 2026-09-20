import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import s from '../styles/Home.module.css';

/* GSAP + Lenis ne servent pas au premier rendu : ils sont chargés après
   l'hydratation pour rester hors du JS initial (budget 150 kB gzip).
   La page est entière et lisible avant leur arrivée. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Contenu réel. Rien n'est inventé : ce qui manque porte un TODO visible. */
const WORK = [
  {
    num: '01',
    title: 'ZoeCare / ZoeFall',
    year: null,
    tags: 'IoT · SATT Paris-Saclay',
    summary:
      'Plateforme IoT de détection de chute, développée en alternance à la SATT Paris-Saclay.',
    figure: null,
    preview: 'aperçu ZoeCare',
  },
  {
    num: '02',
    title: 'AB Tasty — EmotionsAI',
    year: null,
    tags: 'Performance · JavaScript',
    summary:
      'Tag de tracking EmotionsAI. Blocking time ramené de 120 ms à 53 ms.',
    figure: '−56%',
    preview: 'aperçu AB Tasty',
  },
  {
    num: '03',
    title: 'Homelab',
    year: null,
    tags: 'Debian · Média · Réseau · VPN',
    summary:
      'iMac 2009 recyclé en serveur Debian : média, réseau, VPN.',
    figure: null,
    preview: 'aperçu Homelab',
  },
];

/* Loader — compteur % en mono. 1.2s au maximum, jamais davantage. */
function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const total = 1200;
    const started = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - started) / total, 1);
      setCount(Math.round(progress * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else onDone();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className={s.loader} aria-hidden="true">
      <div className={s.loaderRow}>
        <p className={s.meta}>(00) — Chargement</p>
        <p className={s.loaderCount}>{String(count).padStart(3, '0')}</p>
      </div>
      <div className={s.loaderTrack}>
        <div className={s.loaderBar} ref={barRef} />
      </div>
    </div>
  );
}

export default function Home() {
  const scopeRef = useRef(null);
  /* Le loader n'existe que si JS tourne ET que le mouvement est accepté. */
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setReady(true);
    else setLoading(true);
  }, []);

  useEffect(() => {
    if (!ready || !scopeRef.current) return;
    let stopScroll = null;
    let cancelled = false;

    import('../lib/motion').then(({ initSmoothScroll, initTrace, initReveals }) => {
      if (cancelled || !scopeRef.current) return;
      stopScroll = initSmoothScroll();
      initTrace(scopeRef.current);
      initReveals(scopeRef.current);
    });

    return () => {
      cancelled = true;
      if (stopScroll) stopScroll();
    };
  }, [ready]);

  return (
    <>
      <Head>
        <title>Alex Panta — Systèmes connectés, du capteur à la production</title>
        <meta
          name="description"
          content="Alex Panta, développeur full-stack orienté systèmes : IoT et embarqué, backend, sécurité. Plateforme IoT de détection de chute, optimisation de performance, infrastructure auto-hébergée."
        />
      </Head>

      {loading && !ready ? <Loader onDone={() => setReady(true)} /> : null}

      <div data-editorial className={s.page} ref={scopeRef}>
        <a className={s.skipLink} href="#work">
          Aller au contenu
        </a>

        {/* ---------- navigation ---------- */}
        <header className={`${s.shell} ${s.nav}`}>
          <a className={s.navMark} href="#top">
            Alex Panta
          </a>
          <nav aria-label="Sections">
            <ul className={s.navList}>
              <li>
                <a className={s.navLink} href="#work">
                  (01) Selected work
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main id="top">
          {/* ---------- (00) hero ---------- */}
          <section className={`${s.shell} ${s.hero}`}>
            <div className={s.grid}>
              <p className={`${s.meta} ${s.heroLabel}`} data-reveal>
                (00) — <span className={s.metaStrong}>Alex Panta</span>
              </p>

              <h1 className={s.heroName} data-reveal data-reveal-delay="0.06">
                Alex Panta
              </h1>

              <p className={s.heroLine} data-reveal-lines>
                Je construis des systèmes connectés de bout en bout — du capteur embarqué
                à l&rsquo;infrastructure qui le tient en production.
              </p>

              <p className={`${s.meta} ${s.heroFoot}`} data-reveal data-reveal-delay="0.12">
                Paris · 2026
              </p>
            </div>
          </section>

          {/* ---------- (01) selected work ---------- */}
          <section id="work" className={`${s.shell} ${s.section}`} data-trace-group>
            <div className={`${s.rule} ${s.sectionHead}`} data-trace>
              <div className={s.grid} style={{ paddingTop: 'var(--s4)' }}>
                <p className={`${s.meta} ${s.sectionLabel}`} data-reveal>
                  (01) — <span className={s.metaStrong}>Selected work</span>
                </p>
                <p className={s.sectionIntro} data-reveal-lines>
                  Trois systèmes, pas trois maquettes. Chacun est allé jusqu&rsquo;en
                  production.
                </p>
              </div>
            </div>

            <div className={s.work}>
              {WORK.map((project) => (
                <article key={project.num} className={s.workSeparator} data-trace>
                  <div className={s.workRow}>
                    <p className={s.workNum}>{project.num}</p>

                    <div className={s.workMain}>
                      <h2 className={s.workTitle}>{project.title}</h2>
                      <p className={s.workSummary}>{project.summary}</p>
                    </div>

                    <div className={s.workAside}>
                      {project.year ? (
                        <p className={s.meta}>{project.year}</p>
                      ) : (
                        <p className={s.todo}>TODO: dates</p>
                      )}
                      <p className={s.meta}>{project.tags}</p>

                      <div className={s.preview}>
                      <div className={s.previewSlot}>
                        <p className={s.todo}>TODO: {project.preview}</p>
                      </div>
                      {project.figure ? (
                        <div className={s.previewFoot}>
                          <p className={`${s.figure} ${s.figureAccent}`}>{project.figure}</p>
                          <p className={s.meta}>Blocking time · 120 ms → 53 ms</p>
                        </div>
                      ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              <div className={s.workSeparator} data-trace />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
