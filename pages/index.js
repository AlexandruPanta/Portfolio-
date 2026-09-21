import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Meta from '../components/Meta';
import s from '../styles/Home.module.css';
import copy from '../content/copy';
import {
  loaderHasAlreadyPlayed,
  markLoaderPlayed,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  useSiteMotion,
} from '../lib/useSiteMotion';

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

  /* Le loader ne joue qu'au premier chargement réel. En navigation
     client — retour depuis un case study — le module est déjà évalué,
     le drapeau tient, et on entre directement sur la page. */
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(true);

  const finishLoader = useCallback(() => {
    markLoaderPlayed();
    setReady(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion() || loaderHasAlreadyPlayed()) {
      markLoaderPlayed();
      return;
    }
    setReady(false);
    setLoading(true);
  }, []);

  useSiteMotion(scopeRef, ready);

  return (
    <>
      <Meta {...copy.head} />

      {loading && !ready ? <Loader onDone={finishLoader} /> : null}

      <div data-editorial className={s.page} ref={scopeRef}>
        <a className={s.skipLink} href="#top">
          {copy.nav.skip}
        </a>

        {/* ---------- navigation ---------- */}
        <header className={`${s.shell} ${s.nav}`}>
          <a className={s.navMark} href="#top">
            {copy.nav.mark}
          </a>
          <nav aria-label={copy.nav.sectionsLabel}>
            <ul className={s.navList}>
              {copy.nav.items.map((item) => (
                <li key={item.href}>
                  <a className={s.navLink} href={item.href}>
                    {item.index} <span className={s.navLabel}>{item.label}</span>
                  </a>
                </li>
              ))}
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
                      {/* Homelab n'a pas de page : la ligne reste, sans lien
                          et donc sans état de survol. */}
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
                          <p className={s.todo}>{project.preview}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              <div className={s.workSeparator} data-trace />
            </div>
          </section>

          {/* ---------- (02) system ---------- */}
          <section id="system" data-theme="invert" className={s.system} data-trace-group>
            <div className={s.shell}>
              <div className={`${s.grid} ${s.systemHead}`}>
                <p className={`${s.meta} ${s.systemLabel}`} data-reveal>
                  {copy.system.index} —{' '}
                  <span className={s.metaStrong}>{copy.system.label}</span>
                </p>
                <p className={s.systemIntro} data-reveal-lines>
                  {copy.system.intro}
                </p>
              </div>

              <div>
                {copy.system.groups.map((group) => (
                  <div key={group.label} className={s.specRow} data-trace>
                    <p className={`${s.meta} ${s.specLabel}`}>{group.label}</p>
                    <ul className={s.specItems}>
                      {group.items.map((item) => (
                        <li key={item} className={s.specItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- (03) contact ---------- */}
          <section id="contact" className={`${s.shell} ${s.contact}`} data-trace-group>
            <div className={`${s.grid} ${s.contactHead}`}>
              <p className={`${s.meta} ${s.contactLabel}`} data-reveal>
                {copy.contact.index} —{' '}
                <span className={s.metaStrong}>{copy.contact.label}</span>
              </p>
            </div>

            <div className={s.grid}>
              <div className={s.contactBody}>
                <a className={s.contactEmail} href={`mailto:${copy.contact.email}`}>
                  {copy.contact.emailLocal}
                  <wbr />
                  {copy.contact.emailDomain}
                </a>

                <p className={`${s.meta} ${s.contactStatus}`}>{copy.contact.status}</p>

                <ul className={s.contactLinks}>
                  {copy.contact.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className={s.contactLink}
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer className={`${s.shell} ${s.footer}`}>
          <p className={s.meta}>{copy.footer.line}</p>
          <p className={s.meta}>{copy.footer.legalName}</p>
        </footer>
      </div>
    </>
  );
}
