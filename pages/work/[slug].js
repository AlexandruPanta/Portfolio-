import { useRef } from 'react';
import Link from 'next/link';
import Meta from '../../components/Meta';
import s from '../../styles/CaseStudy.module.css';
import copy from '../../content/copy';
import { useSiteMotion } from '../../lib/useSiteMotion';

const studies = Object.values(copy.caseStudies);

/* Chaîne d'architecture — une liste ordonnée, pas un dessin.
   L'ordre est porté par le <ol> ; les connecteurs sont des filets 1px
   en ::after, sans glyphe de flèche. */
function Chain({ steps }) {
  return (
    <ol className={s.chain}>
      {steps.map((step) => (
        <li key={step} className={s.chainStep}>
          {step}
        </li>
      ))}
    </ol>
  );
}

/* Emplacement réservé, pas un texte de remplissage : ces phrases
   s'écrivent à la main, elles ne se rédigent pas à la place d'Alex. */
function Todo({ text }) {
  return (
    <div className={s.todoBlock}>
      <p className={s.todoMark}>{copy.caseStudy.todoMark}</p>
      <p className={s.todoText}>{text}</p>
    </div>
  );
}

export default function CaseStudy({ study }) {
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
          <Link className={s.back} href="/#work">
            ← {copy.caseStudy.back}
          </Link>
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
                          <p className={s.figure}>{fig.value}</p>
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

                  {section.todo ? <Todo text={section.todo} /> : null}
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

export function getStaticPaths() {
  return {
    paths: studies.map((study) => ({ params: { slug: study.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { study: studies.find((study) => study.slug === params.slug) } };
}
