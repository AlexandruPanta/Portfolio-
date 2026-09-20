import Head from 'next/head';
import s from '../styles/Styleguide.module.css';

const TYPE = [
  {
    token: '--t-hero',
    clamp: 'clamp(3.5rem, 11vw, 13rem)',
    px: '375→56 · 768→84 · 1440→158 · 1920→208',
    cls: s.specHero,
    sample: 'Alex Panta',
    use: 'Nom en hero. Une seule occurrence sur tout le site.',
  },
  {
    token: '--t-h2',
    clamp: 'clamp(2rem, 5vw, 4.5rem)',
    px: '375→32 · 768→38 · 1440→72 · 1920→72',
    cls: s.specH2,
    sample: 'Selected work',
    use: 'Titre de section, adresse mail du bloc contact.',
  },
  {
    token: '--t-h3',
    clamp: 'clamp(1.25rem, 2vw, 1.75rem)',
    px: '375→20 · 768→20 · 1440→28 · 1920→28',
    cls: s.specH3,
    sample: 'ZoeCare — détection de chute',
    use: 'Titre de projet en liste, intertitre de case study.',
  },
  {
    token: '--t-body',
    clamp: 'clamp(1rem, 0.885rem + 0.24vw, 1.125rem)',
    px: '375→16 · 768→16 · 1440→17.6 · 1920→18',
    cls: s.specBody,
    sample:
      "Plateforme IoT de détection de chute développée en alternance à la SATT Paris-Saclay. Capteur embarqué, passerelle réseau, backend d'alerte : la chaîne complète, du signal brut à la notification soignant.",
    use: 'Corps de texte, paragraphes de case study.',
  },
  {
    token: '--t-meta',
    clamp: '0.6875rem — fixe',
    px: '11px partout · uppercase · track .12em',
    cls: s.specMeta,
    sample: '(01) — Selected work',
    use: 'Labels de section, tags, navigation, footer.',
  },
];

const COLORS = [
  { token: '--bg', hex: '#F4F2EE', cls: s.sBg, use: 'Fond papier. Fond par défaut du site.', contrast: '—' },
  { token: '--surface', hex: '#FFFFFF', cls: s.sSurface, use: 'Bloc surélevé. Usage rare, jamais en carte.', contrast: '—' },
  { token: '--line', hex: '#D8D3C9', cls: s.sLine, use: 'Filets 1px. Structure principale de la page.', contrast: '1.33:1 sur --bg — décoratif, jamais porteur d’information seul' },
  { token: '--text', hex: '#0C0C0C', cls: s.sText, use: 'Texte principal, titres, chiffres.', contrast: '17.50:1 sur --bg' },
  { token: '--text-dim', hex: '#6B675F', cls: s.sDim, use: 'Texte secondaire, labels meta, légendes.', contrast: '5.03:1 sur --bg — AA corps et grand texte' },
  { token: '--accent', hex: '#1A1AFF', cls: s.sAccent, use: '3 apparitions maximum sur la page d’accueil.', contrast: '7.13:1 sur --bg — en portée inversée, --accent vaut #6E6EFF' },
  { token: '[data-theme="invert"]', hex: '#0C0C0C', cls: s.sInvert, use: 'Portée inversée. Les mêmes noms de tokens y basculent : (02) SYSTEM, et elle seule.', contrast: '--text 17.50:1 · --text-dim 5.68:1 · --accent 4.97:1' },
];

const WEIGHTS = [
  { family: 'Satoshi', cls: s.wDisplay, items: [['300', 'Light'], ['400', 'Regular'], ['500', 'Medium'], ['700', 'Bold'], ['900', 'Black']] },
  { family: 'JetBrains Mono', cls: s.wMono, items: [['400', 'Regular'], ['500', 'Medium'], ['700', 'Bold']] },
  { family: 'Instrument Serif', cls: s.wSerif, items: [['400', 'Regular'], ['400i', 'Italic']] },
];

const SPACE = [
  ['--s1', '8px', s.bar1, 'Interligne de label, écart mot à mot.'],
  ['--s2', '16px', s.bar2, 'Écart intra-bloc.'],
  ['--s3', '24px', s.bar3, 'Gouttière de grille, padding de ligne.'],
  ['--s4', '40px', s.bar4, 'Marge latérale desktop, respiration de bloc.'],
  ['--s5', '64px', s.bar5, 'Écart titre / contenu.'],
  ['--s6', '96px', s.bar6, 'Écart entre sections — mobile.'],
  ['--s7', '160px', s.bar7, 'Écart entre sections — desktop. Minimum.'],
];

function SectionHead({ index, title, note }) {
  return (
    <header className={`${s.grid} ${s.sectionHead}`}>
      <p className={`${s.meta} ${s.colLabel}`}>
        ({index}) — <span className={s.metaStrong}>{title}</span>
      </p>
      <div className={s.colContent}>
        <h2 className={s.sectionTitle}>{title}</h2>
        {note ? <p className={`${s.body} ${s.sectionNote}`}>{note}</p> : null}
      </div>
    </header>
  );
}

export default function Styleguide() {
  return (
    <>
      <Head>
        <title>Styleguide — Alex Panta</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Système de design du portfolio : échelle typographique, palette, filets, survols, espace, grille et motion." />
      </Head>

      <main data-editorial className={s.page}>
        {/* ---------- masthead ---------- */}
        <header className={`${s.grid} ${s.masthead}`}>
          <p className={`${s.meta} ${s.colFull}`}>
            (SG) — <span className={s.metaStrong}>Système</span>
          </p>
          <h1 className={s.mastheadTitle}>Styleguide</h1>
          <p className={`${s.meta} ${s.colLabel}`}>Version 0.1</p>
          <p className={`${s.body} ${s.colContent}`}>
            Référence normative du portfolio. Toute valeur affichée ici provient de{' '}
            <strong>styles/tokens.css</strong>. Une valeur qui ne figure pas dans ce
            document n&rsquo;a pas le droit d&rsquo;exister dans le code.
          </p>
        </header>

        {/* ---------- 01 typographie ---------- */}
        <section className={s.section}>
          <SectionHead
            index="01"
            title="Échelle typographique"
            note="Cinq tailles, pas une de plus. Toutes en clamp : aucune taille fixe sur le display. Les valeurs px indiquées sont les tailles calculées aux quatre largeurs de test."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              {TYPE.map((t) => (
                <div key={t.token} className={s.typeRow}>
                  <p className={s.meta}>
                    <span className={s.metaStrong}>{t.token}</span> · {t.clamp} · {t.px}
                  </p>
                  <p className={`${s.typeSpec} ${t.cls}`}>{t.sample}</p>
                  <p className={`${s.meta} ${s.sectionNote}`}>{t.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 02 familles ---------- */}
        <section className={s.section}>
          <SectionHead
            index="02"
            title="Familles et graisses"
            note="Trois familles, subset latin, woff2 self-hosted, font-display swap. Satoshi est variable (300–900) : une seule requête pour toutes les graisses."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              {WEIGHTS.map((w) => (
                <div key={w.family}>
                  <p className={`${s.meta} ${s.sectionNote}`}>{w.family}</p>
                  {w.items.map(([weight, name]) => (
                    <div key={weight} className={s.weightRow}>
                      <p className={`${s.mono} ${s.weightLabel}`}>
                        {weight} {name}
                      </p>
                      <p
                        className={`${s.weightSpec} ${w.cls}`}
                        style={{
                          fontWeight: weight.replace('i', ''),
                          fontStyle: weight.endsWith('i') ? 'italic' : 'normal',
                        }}
                      >
                        Systèmes embarqués — 0123456789
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03 couleurs ---------- */}
        <section className={s.section}>
          <SectionHead
            index="03"
            title="Palette"
            note="Sept valeurs. Un seul accent. Les ratios sont mesurés, pas estimés : toute paire texte / fond utilisée sur le site doit atteindre 4.5:1."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              {COLORS.map((c) => (
                <div key={c.token} className={s.swatchRow}>
                  <div className={`${s.swatch} ${c.cls}`} />
                  <div className={s.swatchInfo}>
                    <p className={s.meta}>
                      <span className={s.metaStrong}>{c.token}</span> · {c.hex}
                    </p>
                    <p className={s.meta}>{c.use}</p>
                    <p className={s.meta}>{c.contrast}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 04 filets ---------- */}
        <section className={s.section}>
          <SectionHead
            index="04"
            title="Filets et structure"
            note="La page se structure au filet 1px et au vide. Jamais à l'ombre, jamais à la carte. Voici le seul vocabulaire autorisé."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              <p className={`${s.meta} ${s.sectionNote}`}>Filet simple — séparateur</p>
              <div className={s.rule} style={{ marginBottom: 'var(--s5)' }} />

              <p className={`${s.meta} ${s.sectionNote}`}>Ligne éditoriale — le motif de la liste projets</p>
              <div>
                {[
                  ['01', 'ZoeCare / ZoeFall', '2024—25', 'IoT · LoRa · Node'],
                  ['02', 'AB Tasty — EmotionsAI', '2025', 'Perf · JS · Tag'],
                  ['03', 'Homelab', '2023—', 'Debian · Réseau · VPN'],
                ].map(([num, title, year, tags]) => (
                  <div key={num} className={s.listRow}>
                    <p className={s.mono}>{num}</p>
                    <p className={s.listTitle}>{title}</p>
                    <p className={s.mono}>
                      {year} · {tags}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 05 survols ---------- */}
        <section className={s.section}>
          <SectionHead
            index="05"
            title="États de survol"
            note="Deux états, pas trois. Tout autre effet de survol est hors système. Chaque état vaut aussi au clavier : survolez, puis tabulez."
          />
          <div className={s.grid}>
            <div className={s.colContent}>
              <p className={`${s.meta} ${s.sectionNote}`}>A — soulignement accent, offset 0.3em</p>
              <p className={s.specH3} style={{ marginTop: 'var(--s2)' }}>
                <a className={s.hoverUnderline} href="#sg-05">
                  alexandru.panta@exemple.fr
                </a>
                <span className={s.todo}> TODO: adresse définitive</span>
              </p>

              <p className={`${s.meta}`} style={{ marginTop: 'var(--s5)' }}>
                B — inversion complète du bloc
              </p>
              <a
                className={s.hoverInvert}
                data-invert-on-hover
                href="#sg-05"
                id="sg-05"
                style={{ marginTop: 'var(--s2)' }}
              >
                <p className={s.mono}>(02) — AB Tasty</p>
                <p className={s.listTitle} style={{ marginTop: 'var(--s1)' }}>
                  Tag EmotionsAI — 120ms → 53ms
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* ---------- 06 espace ---------- */}
        <section className={s.section}>
          <SectionHead
            index="06"
            title="Espace"
            note="Grille 8pt stricte. Sept valeurs. Entre deux sections : 160px desktop, 96px mobile, jamais moins."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              {SPACE.map(([token, px, cls, use]) => (
                <div key={token} className={s.spaceRow}>
                  <div className={`${s.spaceBar} ${cls}`} />
                  <div>
                    <p className={s.meta}>
                      <span className={s.metaStrong}>{token}</span> · {px}
                    </p>
                    <p className={s.meta}>{use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 07 grille ---------- */}
        <section className={s.section}>
          <SectionHead
            index="07"
            title="Grille"
            note="12 colonnes, gouttière 24px, marges latérales 40px desktop et 20px mobile. Sous 768px la grille retombe à 4 colonnes. Une rupture d'alignement volontaire par section : le label occupe les colonnes 1 à 3, le contenu démarre colonne 5. La colonne 4 reste vide — c'est l'accident délibéré."
          />
          <div className={s.gridDemo}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={s.gridCol}>
                <p className={s.mono}>{String(i + 1).padStart(2, '0')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- 08 motion ---------- */}
        <section className={s.section}>
          <SectionHead
            index="08"
            title="Motion"
            note="Une seule courbe sur tout le site. Reveal = translateY + opacity, rien d'autre. Survolez le rail pour lire la courbe."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              <div className={s.motionTrack} tabIndex={0}>
                <div className={s.motionDot} />
              </div>
              <div style={{ marginTop: 'var(--s3)' }}>
                {[
                  ['--ease', 'cubic-bezier(0.16, 1, 0.3, 1)', 'Unique. Aucune autre courbe sur le site.'],
                  ['--d-fast', '0.6s', 'Survols, micro-transitions.'],
                  ['--d-base', '0.9s', 'Reveal au scroll.'],
                  ['--d-slow', '1.2s', 'Entrée du hero, loader.'],
                  ['--stagger', '0.06s', 'Décalage ligne à ligne.'],
                  ['--reveal-y', '24px', 'Translation d’entrée. Pas de scale, pas de rotation, pas de blur.'],
                ].map(([token, value, use]) => (
                  <div key={token} className={s.spaceRow}>
                    <p className={s.mono}>{token}</p>
                    <div>
                      <p className={s.meta}>
                        <span className={s.metaStrong}>{value}</span>
                      </p>
                      <p className={s.meta}>{use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 09 chiffres ---------- */}
        <section className={s.section}>
          <SectionHead
            index="09"
            title="Chiffres"
            note="Les chiffres sont des éléments graphiques, pas du texte courant. Serif pour le résultat, mono pour la mesure. Chasse tabulaire obligatoire : un compteur animé ne doit produire aucun décalage."
          />
          <div className={s.grid}>
            <div className={s.colFull}>
              <div className={s.figureRow}>
                <div className={s.figure}>
                  <p className={`${s.figureSerif} ${s.figureAccent}`}>−56%</p>
                  <p className={s.meta}>Serif · accent · résultat</p>
                </div>
                <div className={s.figure}>
                  <p className={s.figureMono}>53ms</p>
                  <p className={s.meta}>Mono · après</p>
                </div>
                <div className={s.figure}>
                  <p className={s.figureMono} style={{ color: 'var(--text-dim)' }}>
                    120ms
                  </p>
                  <p className={s.meta}>Mono · dim · avant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 10 portée inversée ---------- */}
        <section className={s.section}>
          <SectionHead
            index="10"
            title="Portée inversée"
            note={'Une seule section du site la porte : (02) SYSTEM. La liste des projets reste sur papier, et le bloc contact reste clair pour que l\u2019adresse mail soit l\u2019élément le plus lumineux de la page.'}
          />
          <div className={s.grid}>
            <div className={s.colContent}>
              <p className={s.body}>
                Aucun token propre à l&rsquo;inversion. <strong>[data-theme=&quot;invert&quot;]</strong>{' '}
                redéfinit les <strong>mêmes noms</strong> dans sa portée : un composant lit{' '}
                <code>--bg</code>, <code>--text</code>, <code>--line</code> et ne sait jamais
                dans quel thème il se trouve. Le filet y tient 1.39:1, en miroir du 1.33:1 du
                thème clair — on conserve le poids perçu, pas la valeur.
              </p>

              <div className={s.invertPreview} data-theme="invert">
                <p className={s.meta}>
                  (02) — <span className={s.metaStrong}>System</span>
                </p>
                <div className={s.rule} style={{ marginTop: 'var(--s2)' }} />
                <p style={{ marginTop: 'var(--s2)' }}>
                  <code>--text</code> sur <code>--bg</code> — 17.50:1
                </p>
                <p className={s.invertDim}>
                  <code>--text-dim</code> — 5.68:1
                </p>
                <p>
                  <code className={s.invertAccent}>--accent</code> — 4.97:1. AA tout juste :
                  un accent, jamais un corps de texte entier. Cette ligne se tient à sa propre
                  règle : seul le nom du token porte la couleur.
                </p>
                <p className={s.meta} style={{ marginTop: 'var(--s3)' }}>
                  Le filet ci-dessus est <code>--line</code>, rebasculé sans que le composant
                  le sache.
                </p>
              </div>

              <p className={`${s.meta} ${s.sectionNote}`} style={{ marginTop: 'var(--s5)' }}>
                Footer — fuseau horaire
              </p>
              <p className={s.listTitle} style={{ marginTop: 'var(--s1)' }}>
                PARIS — UTC+2
              </p>
            </div>
          </div>
        </section>

        {/* ---------- en attente ---------- */}
        <section className={s.section}>
          <SectionHead
            index="11"
            title="En attente de contenu"
            note="Rien n'est inventé. Ces marques restent visibles jusqu'à ce que l'information arrive."
          />
          <div className={s.grid}>
            <div className={s.colContent}>
              <div className={s.openBlock}>
                <ul className={`${s.body} ${s.openList}`}>
                  <li>
                    <span className={s.todo}>TODO:</span> adresse mail réelle à afficher dans le
                    bloc contact.
                  </li>
                  <li>
                    <span className={s.todo}>TODO:</span> dates exactes de l&rsquo;alternance SATT
                    Paris-Saclay et du poste AB Tasty.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
