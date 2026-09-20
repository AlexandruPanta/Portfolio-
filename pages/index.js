import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import s from '../styles/Home.module.css';
import copy from '../content/copy';

/* GSAP + Lenis ne servent pas au premier rendu : ils sont chargés après
   l'hydratation pour rester hors du JS initial (budget 150 kB gzip).
   Aucun état masqué n'est posé avant qu'ils ne soient là — voir §8. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        <p className={s.meta}>
          {copy.loader.index} — {copy.loader.label}
        </p>
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
  const motionRef = useRef(null);
  const primedRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [motionLoaded, setMotionLoaded] = useState(false);

  const finishLoader = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (prefersReducedMotion()) setReady(true);
    else setLoading(true);
  }, []);

  /* Le chargement part dès le montage, en parallèle du loader : sur un
     réseau correct, motion.js est prêt bien avant la levée du loader. */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let cancelled = false;
    import('../lib/motion').then((mod) => {
      if (cancelled) return;
      motionRef.current = mod;
      setMotionLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* Masquer pendant que le loader couvre l'écran : invisible, donc sûr.
     S'il est déjà levé, on ne prime pas — `start` ne touchera alors
     qu'aux éléments hors écran. */
  useEffect(() => {
    if (!motionLoaded || ready || !scopeRef.current) return;
    primedRef.current = motionRef.current.prime(scopeRef.current);
  }, [motionLoaded, ready]);

  useEffect(() => {
    if (!ready || !motionLoaded || !scopeRef.current) return undefined;
    return motionRef.current.start(scopeRef.current, { primed: primedRef.current });
  }, [ready, motionLoaded]);

  return (
    <>
      <Head>
        <title>{copy.head.title}</title>
        <meta name="description" content={copy.head.description} />
      </Head>

      {loading && !ready ? <Loader onDone={finishLoader} /> : null}

      <div data-editorial className={s.page} ref={scopeRef}>
        <a className={s.skipLink} href="#work">
          {copy.nav.skip}
        </a>

        {/* ---------- navigation ---------- */}
        <header className={`${s.shell} ${s.nav}`}>
          <a className={s.navMark} href="#top">
            {copy.nav.mark}
          </a>
          <nav aria-label={copy.nav.sectionsLabel}>
            <ul className={s.navList}>
              <li>
                <a className={s.navLink} href="#work">
                  {copy.work.index} {copy.work.label}
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
                {copy.hero.index} — <span className={s.metaStrong}>{copy.hero.label}</span>
              </p>

              <h1 className={s.heroName} data-reveal data-reveal-delay="0.06">
                {copy.hero.name}
              </h1>

              <p className={s.heroLine} data-reveal-lines>
                {copy.hero.line}
              </p>

              <p className={`${s.meta} ${s.heroFoot}`} data-reveal data-reveal-delay="0.12">
                {copy.hero.foot}
              </p>
            </div>
          </section>

          {/* ---------- (01) selected work ---------- */}
          <section id="work" className={`${s.shell} ${s.section}`} data-trace-group>
            <div className={`${s.rule} ${s.sectionHead}`} data-trace>
              <div className={s.grid} style={{ paddingTop: 'var(--s4)' }}>
                <p className={`${s.meta} ${s.sectionLabel}`} data-reveal>
                  {copy.work.index} — <span className={s.metaStrong}>{copy.work.label}</span>
                </p>
                <p className={s.sectionIntro} data-reveal-lines>
                  {copy.work.intro}
                </p>
              </div>
            </div>

            <div className={s.work}>
              {copy.work.projects.map((project) => (
                <article key={project.num} className={s.workSeparator} data-trace>
                  <div className={s.workRow}>
                    <p className={s.workNum}>{project.num}</p>

                    <div className={s.workMain}>
                      <h2 className={s.workTitle}>
                        {project.href ? (
                          <Link className={s.workLink} href={project.href}>
                            {project.title}
                          </Link>
                        ) : (
                          project.title
                        )}
                      </h2>
                      <p className={s.workContext}>{project.context}</p>
                      <p className={s.workSummary}>{project.summary}</p>
                    </div>

                    <div className={s.workAside}>
                      <p className={s.meta}>{project.tags.join(copy.glyph.dot)}</p>

                      <p className={s.rowFigure}>{project.figure}</p>
                      <p className={`${s.meta} ${s.rowFigureCaption}`}>
                        {project.figureCaption}
                      </p>

                      <div className={s.preview}>
                        <div className={s.previewSlot}>
                          <p className={s.todo}>TODO: {project.preview}</p>
                        </div>
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
