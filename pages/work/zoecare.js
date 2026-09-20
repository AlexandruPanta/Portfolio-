import Head from 'next/head';
import Link from 'next/link';
import s from '../../styles/CaseStudy.module.css';
import copy from '../../content/copy';

const study = copy.caseStudies.zoecare;

/* Schéma horizontal — cinq nœuds sur une seule ligne.
   1px partout, angles droits, labels mono. L'accent ne porte que le
   chemin critique : le trait continu qui relie capteur à soignant. */
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
      {/* Chemin critique : un seul trait, du premier au dernier nœud.
          Il s'arrête pile au bord des boîtes extrêmes — un trait qui
          dépasserait laisserait deux moignons sans signification. */}
      <path className={s.path} d={`M 14 ${Y} H ${W - 14}`} />

      {nodes.map((label, i) => {
        const cx = gap * i + gap / 2;
        const halfW = gap / 2 - 14;
        return (
          <g key={label}>
            {/* la boîte masque le trait sous le label : pas de superposition */}
            <rect
              x={cx - halfW}
              y={Y - BOX_H / 2}
              width={halfW * 2}
              height={BOX_H}
              fill="var(--bg)"
              stroke="none"
            />
            <rect
              className={s.node}
              x={cx - halfW}
              y={Y - BOX_H / 2}
              width={halfW * 2}
              height={BOX_H}
            />
            {/* chevron d'angles droits vers l'étape suivante */}
            {i < nodes.length - 1 ? (
              <path
                className={s.path}
                d={`M ${cx + halfW + 10} ${Y - 5} L ${cx + halfW + 15} ${Y} L ${
                  cx + halfW + 10
                } ${Y + 5}`}
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

/* Même chaîne, redressée : cinq labels mono ne tiennent pas sur 335px.
   Exactement le même dessin, pivoté — la boîte porte son label, le trait
   d'accent descend au centre et passe derrière elles. */
function DiagramTall({ nodes }) {
  const W = 320;
  const BOX_H = 34;
  const STEP = 58;
  const H = STEP * (nodes.length - 1) + BOX_H;
  const CX = W / 2;

  const top = BOX_H / 2;
  const bottom = STEP * (nodes.length - 1) + BOX_H / 2;

  return (
    <svg
      className={s.diagramSvgMobile}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className={s.path} d={`M ${CX} ${top} V ${bottom}`} />

      {nodes.map((label, i) => {
        const cy = STEP * i + BOX_H / 2;
        return (
          <g key={label}>
            <rect x={0} y={cy - BOX_H / 2} width={W} height={BOX_H} fill="var(--bg)" stroke="none" />
            <rect className={s.node} x={0} y={cy - BOX_H / 2} width={W} height={BOX_H} />
            {i < nodes.length - 1 ? (
              <path
                className={s.path}
                d={`M ${CX - 5} ${cy + BOX_H / 2 + 12} L ${CX} ${cy + BOX_H / 2 + 17} L ${
                  CX + 5
                } ${cy + BOX_H / 2 + 12}`}
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

function Todo({ text }) {
  return (
    <div className={s.todoBlock}>
      <p className={s.todoMark}>TODO: à écrire</p>
      <p className={s.todoText}>{text}</p>
    </div>
  );
}

export default function ZoeCare() {
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
            ← {study.back}
          </Link>
        </header>

        <main id="study">
          {/* ---------- titre ---------- */}
          <section className={`${s.shell} ${s.masthead}`}>
            <div className={s.grid}>
              <p className={`${s.meta} ${s.mastheadLabel}`}>
                {study.index} — <span className={s.metaStrong}>{study.label}</span>
              </p>

              <h1 className={s.title}>{study.title}</h1>

              <div className={s.mastheadContext}>
                <p className={s.meta}>{study.context}</p>
                <p className={`${s.meta} ${s.mastheadTags}`}>
                  {study.tags.join(copy.glyph.dot)}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- sections ---------- */}
          {study.sections.map((section) => (
            <section key={section.num} className={`${s.shell} ${s.section}`}>
              <div className={s.grid}>
                <p className={`${s.meta} ${s.sectionLabel}`}>
                  ({section.num}) —{' '}
                  <span className={s.metaStrong}>{section.title}</span>
                </p>

                <div className={s.sectionBody}>
                  <h2 className={s.sectionTitle}>{section.title}</h2>

                  {section.figure ? (
                    <div className={s.figureBlock}>
                      <p className={s.figure}>{section.figure}</p>
                      <p className={`${s.meta} ${s.figureCaption}`}>
                        {section.figureCaption}
                      </p>
                    </div>
                  ) : null}

                  {section.body
                    ? section.body.map((line) => (
                        <p key={line.slice(0, 24)} className={s.paragraph}>
                          {line}
                        </p>
                      ))
                    : null}

                  {section.todo ? <Todo text={section.todo} /> : null}

                  {section.diagram ? (
                    <figure className={s.diagram}>
                      <DiagramWide nodes={study.diagram.nodes} />
                      <DiagramTall nodes={study.diagram.nodes} />
                      <figcaption className={`${s.meta} ${s.diagramCaption}`}>
                        {study.diagram.caption}
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              </div>
            </section>
          ))}

          {/* ---------- stack ---------- */}
          <section className={`${s.shell} ${s.section}`}>
            <div className={s.grid}>
              <p className={`${s.meta} ${s.sectionLabel}`}>
                ({study.stack.num}) —{' '}
                <span className={s.metaStrong}>{study.stack.title}</span>
              </p>
              <div className={s.sectionBody}>
                <ul className={s.stackList}>
                  {study.stack.items.map((item) => (
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
          <p className={s.meta}>{copy.footer.timezone}</p>
          <Link className={s.back} href="/#work">
            ← {study.back}
          </Link>
        </footer>
      </div>
    </>
  );
}
