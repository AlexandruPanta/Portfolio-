import Head from 'next/head';
import Link from 'next/link';
import s from '../../styles/CaseStudy.module.css';
import copy from '../../content/copy';

const studies = Object.values(copy.caseStudies);

/* Schéma horizontal — les nœuds d'une chaîne sur une seule ligne.
   1px partout, angles droits, labels mono. Le chemin critique est le
   trait continu qui relie le premier nœud au dernier ; il s'arrête pile
   à leur bord, un trait qui dépasse laissant deux moignons sans
   signification. Les nœuds masquent le trait sous eux. */
function DiagramWide({ nodes }) {
  const W = 1000;
  const Y = 34;
  const BOX_H = 34;
  const gap = W / nodes.length;

  return (
    <svg
      className={s.diagramSvg}
      viewBox={`0 0 ${W} 96`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className={s.path} d={`M 14 ${Y} H ${W - 14}`} />

      {nodes.map((label, i) => {
        const cx = gap * i + gap / 2;
        const halfW = gap / 2 - 14;
        return (
          <g key={label}>
            <rect
              x={cx - halfW}
              y={Y - BOX_H / 2}
              width={halfW * 2}
              height={BOX_H}
              fill="var(--bg)"
              stroke="none"
            />
            <rect className={s.node} x={cx - halfW} y={Y - BOX_H / 2} width={halfW * 2} height={BOX_H} />
            {i < nodes.length - 1 ? (
              <path
                className={s.path}
                d={`M ${cx + halfW + 10} ${Y - 5} L ${cx + halfW + 15} ${Y} L ${cx + halfW + 10} ${Y + 5}`}
              />
            ) : null}
            <text className={s.nodeLabel} x={cx} y={Y + 4} textAnchor="middle">
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Même dessin, pivoté : cinq labels mono ne tiennent pas sur 335px. */
function DiagramTall({ nodes }) {
  const W = 320;
  const BOX_H = 34;
  const STEP = 58;
  const H = STEP * (nodes.length - 1) + BOX_H;
  const CX = W / 2;

  return (
    <svg
      className={s.diagramSvgMobile}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className={s.path} d={`M ${CX} ${BOX_H / 2} V ${STEP * (nodes.length - 1) + BOX_H / 2}`} />

      {nodes.map((label, i) => {
        const cy = STEP * i + BOX_H / 2;
        return (
          <g key={label}>
            <rect x={0} y={cy - BOX_H / 2} width={W} height={BOX_H} fill="var(--bg)" stroke="none" />
            <rect className={s.node} x={0} y={cy - BOX_H / 2} width={W} height={BOX_H} />
            {i < nodes.length - 1 ? (
              <path
                className={s.path}
                d={`M ${CX - 5} ${cy + BOX_H / 2 + 12} L ${CX} ${cy + BOX_H / 2 + 17} L ${CX + 5} ${
                  cy + BOX_H / 2 + 12
                }`}
              />
            ) : null}
            <text className={s.nodeLabel} x={CX} y={cy + 4} textAnchor="middle">
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
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
  return (
    <>
      <Head>
        <title>{study.head.title}</title>
        <meta name="description" content={study.head.description} />
      </Head>

      <div data-editorial className={s.page}>
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
            <section key={section.num} className={`${s.shell} ${s.section}`}>
              <div className={s.grid}>
                <p className={`${s.meta} ${s.sectionLabel}`}>
                  ({section.num}) — <span className={s.metaStrong}>{section.title}</span>
                </p>

                <div className={s.sectionBody}>
                  <h2 className={s.sectionTitle}>{section.title}</h2>

                  {section.figure ? (
                    <div className={s.figureBlock}>
                      <p className={s.figure}>{section.figure}</p>
                      <p className={`${s.meta} ${s.figureCaption}`}>{section.figureCaption}</p>
                    </div>
                  ) : null}

                  {(section.body || []).map((line) => (
                    <p key={line.slice(0, 24)} className={s.paragraph}>
                      {line}
                    </p>
                  ))}

                  {section.todo ? <Todo text={section.todo} /> : null}

                  {section.diagram ? (
                    <figure className={s.diagram}>
                      <DiagramWide nodes={section.diagram.nodes} />
                      <DiagramTall nodes={section.diagram.nodes} />
                      <figcaption className={`${s.meta} ${s.diagramCaption}`}>
                        {section.diagram.caption}
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              </div>
            </section>
          ))}

          <section className={`${s.shell} ${s.section}`}>
            <div className={s.grid}>
              <p className={`${s.meta} ${s.sectionLabel}`}>
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
