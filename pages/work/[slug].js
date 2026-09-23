import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import LangSwitch from '../../components/LangSwitch';
import s from '../../styles/CaseStudy.module.css';
import { fr, en } from '../../content/copy';
import { useSiteMotion } from '../../lib/useSiteMotion';

const copyByLocale = { fr, en };

/* Chaîne d'architecture — une liste ordonnée, pas un dessin.
   L'ordre est porté par le <ol>. Les 4 bords de chaque boîte et les
   connecteurs sont des éléments réels (pas des ::after) : lib/motion.js
   doit pouvoir les cibler pour le tracé de la V1.1 — voir DESIGN.md §8.
   Sans JS, ou en mouvement réduit, ils sont posés à l'état final par le
   CSS : la chaîne se lit intégralement immobile. */
function Chain({ steps }) {
  return (
    <div className={s.chainWrap} data-chain>
      <ol className={s.chain} data-chain-track>
        {steps.map((step, i) => (
          <li key={step} className={s.chainStep} data-chain-step>
            <span className={`${s.chainEdge} ${s.chainEdgeTop}`} data-chain-edge="top" aria-hidden="true" />
            <span className={`${s.chainEdge} ${s.chainEdgeRight}`} data-chain-edge="right" aria-hidden="true" />
            <span className={`${s.chainEdge} ${s.chainEdgeBottom}`} data-chain-edge="bottom" aria-hidden="true" />
            <span className={`${s.chainEdge} ${s.chainEdgeLeft}`} data-chain-edge="left" aria-hidden="true" />
            <span className={s.chainLabel}>{step}</span>
            {i < steps.length - 1 ? (
              <span className={s.chainConnector} data-chain-connector aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <span className={s.chainPulse} data-chain-pulse aria-hidden="true" />
    </div>
  );
}

/* Emplacement réservé, pas un texte de remplissage : ces phrases
   s'écrivent à la main, elles ne se rédigent pas à la place d'Alex. */
function Todo({ text, mark }) {
  return (
    <div className={s.todoBlock}>
      <p className={s.todoMark}>{mark}</p>
      <p className={s.todoText}>{text}</p>
    </div>
  );
}

export default function CaseStudy({ study }) {
  const { locale } = useRouter();
  const copy = copyByLocale[locale] || fr;

  const scopeRef = useRef(null);
  /* Pas de loader sur un case study : il n'appartient qu'à l'entrée du
     site. `ready` est donc vrai d'emblée, et seul le hors-écran est
     masqué. */
  useSiteMotion(scopeRef, true);

  return (
    <>
      <Meta {...study.head} />

      <div data-editorial className={s.page} ref={scopeRef}>
        <a className={s.skipLink} href="#study">
          {copy.nav.skip}
        </a>

        <header className={`${s.shell} ${s.nav}`}>
          <Link className={s.navMark} href="/">
            {copy.nav.mark}
          </Link>
          <div className={s.navRight}>
            <Link className={s.back} href="/#work">
              ← <span className={s.navLabel}>{copy.caseStudy.back}</span>
            </Link>
            <LangSwitch styles={s} />
          </div>
        </header>

        <main id="study">
          <section className={`${s.shell} ${s.masthead}`}>
            <div className={s.grid}>
              <p className={`${s.meta} ${s.mastheadLabel}`}>
                {study.index} — <span className={s.metaStrong}>{study.label}</span>
              </p>

              <h1 className={s.title}>{study.title}</h1>

              <div className={s.mastheadContext}>
                <p className={s.meta}>{study.context}</p>
                <p className={`${s.meta} ${s.mastheadTags}`}>{study.tags.join(copy.glyph.dot)}</p>
              </div>
            </div>
          </section>

          {study.sections.map((section) => (
            <section
              key={section.num}
              className={`${s.shell} ${s.section}`}
              data-trace-group
            >
              <div className={s.sectionRule} data-trace />
              <div className={s.grid}>
                <p className={`${s.meta} ${s.sectionLabel}`} data-reveal>
                  ({section.num}) — <span className={s.metaStrong}>{section.title}</span>
                </p>

                <div className={s.sectionBody}>
                  <h2 className={s.sectionTitle}>{section.title}</h2>

                  {/* Un ou plusieurs chiffres par résultat : la grammaire ne
                      change pas selon leur nombre. */}
                  {section.figures ? (
                    <div className={s.figures}>
                      {section.figures.map((fig) => (
                        <div key={fig.value} className={s.figureBlock}>
                          <p className={s.figure} data-counter>
                            {fig.value}
                          </p>
                          <p className={`${s.meta} ${s.figureCaption}`}>{fig.caption}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {section.chain ? <Chain steps={section.chain} /> : null}

                  {(section.body || []).map((line) => (
                    <p key={line.slice(0, 24)} className={s.paragraph} data-reveal-lines>
                      {line}
                    </p>
                  ))}

                  {section.todo ? <Todo text={section.todo} mark={copy.caseStudy.todoMark} /> : null}
                </div>
              </div>
            </section>
          ))}

          <section className={`${s.shell} ${s.section}`} data-trace-group>
            <div className={s.sectionRule} data-trace />
            <div className={s.grid}>
              <p className={`${s.meta} ${s.sectionLabel}`} data-reveal>
                ({copy.caseStudy.stackNum}) —{' '}
                <span className={s.metaStrong}>{copy.caseStudy.stackLabel}</span>
              </p>
              <div className={s.sectionBody}>
                <ul className={s.stackList}>
                  {study.stack.map((item) => (
                    <li key={item} className={s.stackItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer className={`${s.shell} ${s.footer}`}>
          <p className={s.meta}>{copy.footer.line}</p>
          <Link className={s.back} href="/#work">
            ← {copy.caseStudy.back}
          </Link>
        </footer>
      </div>
    </>
  );
}

export function getStaticPaths({ locales }) {
  const paths = locales.flatMap((locale) =>
    Object.values(copyByLocale[locale].caseStudies).map((study) => ({
      params: { slug: study.slug },
      locale,
    }))
  );
  return { paths, fallback: false };
}

export function getStaticProps({ params, locale }) {
  const studies = Object.values(copyByLocale[locale].caseStudies);
  return { props: { study: studies.find((study) => study.slug === params.slug) } };
}
