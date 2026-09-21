# DESIGN.md — Portfolio Alex Panta

Référence normative. `styles/tokens.css` en est la traduction machine.
Une valeur qui ne figure pas ici n'a pas le droit d'exister dans le code.

Version 0.2 · étape 0 validée · route de contrôle : `/styleguide`

---

## 1 · Intention

Prouver que je construis des systèmes. Pas lister des logos de technos.

Le site doit se lire comme une **fiche technique d'instrument** ou une **revue de
design imprimée**. Cible : recruteurs CDI en IoT/embarqué et medtech/e-santé,
France. Trente secondes d'attention, desktop et mobile.

Famille esthétique : **éditorial clair / brutalisme suisse**. Fond clair assumé —
la quasi-totalité des portfolios de développeur sont sombres, la différenciation
est là.

---

## 2 · Tokens

Référence complète. Chaque token a le même statut : ceux de la commande initiale
comme ceux ajoutés depuis. Aucune valeur de design ne vit ailleurs.

### Couleurs — thème clair

| Token | Valeur | Rôle |
|---|---|---|
| `--bg` | `#F4F2EE` | Papier. Fond par défaut. |
| `--surface` | `#FFFFFF` | Bloc surélevé. Usage rare, jamais en carte. |
| `--line` | `#D8D3C9` | Filets 1px. Structure principale. |
| `--text` | `#0C0C0C` | Texte principal, titres, chiffres. |
| `--text-dim` | `#6B675F` | Texte secondaire, labels, légendes. |
| `--accent` | `#1A1AFF` | Accent unique. 3 usages max en home. |
| `--invert-bg` | `#0C0C0C` | Valeur de fond de la portée inversée. |

### Couleurs — portée inversée

`[data-theme="invert"]` redéfinit **les mêmes noms**. Un composant lit `--bg`, `--text`,
`--line` et ne sait jamais dans quel thème il se trouve. Une seule section du site porte
cet attribut : **(02) SYSTEM**.

| Token | Valeur | Rôle |
|---|---|---|
| `--bg` | `#0C0C0C` | Fond de la portée. |
| `--surface` | `#161616` | Bloc surélevé dans la portée. |
| `--line` | `#2E2B26` | Filets 1px de la portée. |
| `--text` | `#F4F2EE` | Texte principal. |
| `--text-dim` | `#8E8A80` | Texte secondaire. |
| `--accent` | `#6E6EFF` | Accent. |

`[data-invert-on-hover]` applique la même bascule le temps d'un survol — c'est le survol B
de §6. Même palette, déclarée une seule fois.

### Typographie

| Token | Valeur |
|---|---|
| `--font-display` | `'Satoshi', 'General Sans', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` |
| `--font-serif` | `'Instrument Serif', Georgia, serif` |
| `--t-hero` | `clamp(3.5rem, 11vw, 13rem)` |
| `--t-h2` | `clamp(2rem, 5vw, 4.5rem)` |
| `--t-h3` | `clamp(1.25rem, 2vw, 1.75rem)` |
| `--t-body` | `clamp(1rem, 0.885rem + 0.24vw, 1.125rem)` |
| `--t-meta` | `0.6875rem` — fixe |
| `--track-display` | `-0.035em` |
| `--track-meta` | `0.12em` |
| `--leading-display` | `0.92` |
| `--leading-body` | `1.55` |

### Espace, grille, forme

| Token | Valeur |
|---|---|
| `--s1` … `--s7` | 8 · 16 · 24 · 40 · 64 · 96 · 160 px |
| `--grid-cols` | `12` |
| `--gutter` | `var(--s3)` — 24px |
| `--margin` | `var(--s4)` — 40px, 20px sous 768px |
| `--radius` | `2px` — maximum absolu, hors cercles parfaits |
| `--border` | `1px solid var(--line)` |

### Motion

| Token | Valeur |
|---|---|
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` — unique sur tout le site |
| `--d-fast` | `0.6s` |
| `--d-base` | `0.9s` |
| `--d-slow` | `1.2s` |
| `--stagger` | `0.06s` |
| `--reveal-y` | `24px` |

### Interaction

| Token | Valeur |
|---|---|
| `--focus-ring` | `2px solid var(--accent)` |
| `--focus-offset` | `2px` |
| `--underline-thickness` | `1px` — fixe, jamais proportionnel |
| `--underline-offset` | `0.22em` — proportionnel, lui |

### Règle des tokens composés

> Tout token composé d'un `var()` se substitue à la déclaration et hérite résolu.
> Il doit être redéclaré dans chaque portée de thème. Vérification obligatoire
> à chaque nouveau token composé.

Concernés à ce jour : `--border` et `--focus-ring`, redéclarés dans
`[data-theme="invert"]`. Le défaut que la règle évite : `--focus-ring` déclaré sur
`:root` vaut déjà `2px solid #1A1AFF` et hérite tel quel dans la portée inversée, soit
un anneau de focus à **2.46:1** sur fond noir — sous le 3:1 exigé.

### Nom d'affichage

**Alex Panta** partout où le nom est du contenu : hero, titres, balise `<title>`.
**Alexandru Panta** uniquement en footer et sur les mentions légales. C'est sous
« Alex Panta » qu'il est trouvé — ce nom ne se renomme pas.

---

## 3 · Principes non négociables

1. **La typographie EST le visuel.** Zéro illustration décorative.
2. **Un seul accent couleur**, 3 apparitions maximum sur la page d'accueil.

   > Le plafond de 3 compte les apparitions **au repos**. Survol, focus et états
   > transitoires sont des états : ils ne consomment pas le budget.

   Au repos, l'accent est réservé à **l'adresse mail**, exclusivement. Rien d'autre sur
   le site ne porte `--accent` au repos — ni les chiffres, ni les marques `TODO:`, ni le
   chemin critique des schémas.
3. **La structure se fait au filet 1px et au vide.** Jamais à l'ombre, jamais à la carte.
4. **Chaque section porte un label meta** en mono minuscule : `(01) — SELECTED WORK`.
5. **Le vide est un élément de design** : 160px minimum entre sections desktop, 96px mobile.
6. **Une rupture d'alignement volontaire par section.** Pas de centrage par défaut.

---

## 4 · Couleurs — règles d'usage

Valeurs en §2. Ratios **mesurés**, pas estimés.

### Thème clair

| Paire | Ratio | Verdict |
|---|---|---|
| `--text` sur `--bg` | **17.50:1** | AAA |
| `--text` sur `--surface` | **19.56:1** | AAA |
| `--text-dim` sur `--bg` | **5.03:1** | AA corps et grand texte |
| `--accent` sur `--bg` | **7.13:1** | AAA |
| `--line` sur `--bg` | 1.33:1 | décoratif |

### Portée inversée

| Paire | Ratio | Verdict |
|---|---|---|
| `--text` sur `--bg` | **17.50:1** | AAA |
| `--text` sur `--surface` | **16.18:1** | AAA |
| `--text-dim` sur `--bg` | **5.68:1** | AA |
| `--text-dim` sur `--surface` | **5.25:1** | AA |
| `--accent` sur `--bg` | **4.97:1** | AA tout juste |
| `--accent` sur `--surface` | **4.60:1** | AA tout juste |
| `--line` sur `--bg` | 1.39:1 | décoratif |

**Règles dures**

- `--line` est **décoratif** dans les deux thèmes. Un filet ne porte jamais seul une
  information : toute séparation doit rester compréhensible filets masqués. Son ratio est
  calé à 1.39:1 en inversé contre 1.33:1 en clair — on conserve le **poids perçu**, pas la
  valeur.
- `--accent` en portée inversée passe AA de justesse. Il sert d'**accent** : un chiffre, un
  lien, un soulignement. **Jamais un corps de texte entier.**
- Sélection de texte : fond `--accent`, texte `--bg`. Bascule avec la portée.
- Focus : `var(--focus-ring)`, offset `var(--focus-offset)`. 7.13:1 en clair, 4.97:1 en
  inversé — au-delà du 3:1 requis dans les deux cas.

**Les 3 usages de l'accent en home** — budget à tenir, à arbitrer en étape 7 :
un chiffre clé, un soulignement de survol, un état de focus. Pas davantage.

---

## 5 · Typographie — règles d'usage

Cinq tailles. Pas une de plus. Toutes en `clamp()` — aucune taille fixe sur le display.
Valeurs en §2, tailles calculées aux largeurs de test ci-dessous.

| Token | 375px | 768px | 1440px | 1920px | Usage |
|---|---|---|---|---|---|
| `--t-hero` | 56 | 84 | 158 | 208 | Nom en hero. Une occurrence sur tout le site. |
| `--t-h2` | 32 | 38 | 72 | 72 | Titre de section, adresse mail du contact. |
| `--t-h3` | 20 | 20 | 28 | 28 | Titre de projet, intertitre de case study. |
| `--t-body` | 16 | 16 | 17.6 | 18 | Corps de texte. Palier à 18px dès 1600px. |
| `--t-meta` | 11 | 11 | 11 | 11 | Labels, tags, nav, footer. |

Le label meta est **toujours** : mono, 11px, uppercase, `--track-meta`, couleur
`--text-dim`, le nom de section en `--text`.

### Familles

Trois familles, subset latin, woff2 self-hosted, `font-display: swap`. **105 kB au total.**

| Famille | Token | Fichier | Poids | Graisses |
|---|---|---|---|---|
| Satoshi (Fontshare) | `--font-display` | `Satoshi-Variable.woff2` | 43 kB | variable 300–900 |
| JetBrains Mono | `--font-mono` | `JetBrainsMono-latin.woff2` | 31 kB | variable 400–700 |
| Instrument Serif | `--font-serif` | `InstrumentSerif-latin.woff2` | 15 kB | 400 |
| Instrument Serif *italic* | `--font-serif` | `InstrumentSerif-Italic-latin.woff2` | 16 kB | 400 italic |

Satoshi est **variable** : une seule requête couvre toutes les graisses.
Le subset latin `U+0000–00FF` couvre l'intégralité des accents français.
Instrument Serif et JetBrains Mono portent un `unicode-range` : le navigateur ne
télécharge le fichier que si un caractère de la plage est réellement utilisé.

---

## 6 · Espace et grille

Grille 8pt stricte. Sept valeurs, aucune intermédiaire.

| Token | Valeur | Usage |
|---|---|---|
| `--s1` | 8px | Interligne de label, écart mot à mot. |
| `--s2` | 16px | Écart intra-bloc. |
| `--s3` | 24px | Gouttière de grille, padding de ligne. |
| `--s4` | 40px | Marge latérale desktop, respiration de bloc. |
| `--s5` | 64px | Écart titre / contenu. |
| `--s6` | 96px | Écart entre sections — mobile. **Minimum.** |
| `--s7` | 160px | Écart entre sections — desktop. **Minimum.** |

**Grille** — 12 colonnes, gouttière `--gutter`, marges latérales `--margin`.
Sous 768px la grille retombe à 4 colonnes : 12 pistes plus 11 gouttières de 24px ne
tiennent pas dans 335px de contenu.

**Rupture d'alignement** — une par section, volontaire. Convention retenue : le label
meta occupe les colonnes **1 à 3**, le contenu démarre **colonne 5**. La colonne 4 reste
vide — le décalage d'une colonne est l'accident délibéré.

> Les pistes se déclarent en `minmax(0, 1fr)`, jamais en `1fr`. En `1fr` le minimum
> automatique d'une piste est son contenu : une ligne plus fournie élargit ses colonnes
> au détriment des autres, et deux lignes censées partager la même grille dérivent. La
> fiche technique du (02) perdait 16px sur sa colonne de label entre la première ligne
> et la quatrième.

Les enfants de grille portent en plus un `min-width: 0`, et les chaînes mono longues un
`overflow-wrap: anywhere`.

### Langue

> Labels meta en **anglais** (`(01) — SELECTED WORK`), corps de texte en **français**.
> Les labels ne se traduisent pas : ils sont déjà dans la langue du système.

### Chaînes de copie

Toute la copie vit dans `content/copy.js`, aucune chaîne rédactionnelle dans le JSX.
Une version EN s'ajoute en dupliquant la clé de langue, sans toucher un composant.

---

## 7 · Vocabulaire autorisé

Ce qui a le droit d'exister. Le reste est hors système.

**Filet simple** — `border-top: var(--border)`. Séparateur.

**Ligne éditoriale** — le motif de la liste projets : grille `numéro | titre | année · tags`,
filet en haut, `--s3` de padding vertical. Pas de carte, pas d'ombre, pas de fond.

**Label de section** — `(01) — SELECTED WORK`, mono 11px uppercase.

**Ligne de contexte** — sous le titre d'un projet, mono `--t-meta`, `--text-dim`,
uppercase. Elle porte l'employeur, la nature du poste et les dates :
`ALTERNANCE · SATT PARIS-SACLAY · 2024 → EN COURS`. La flèche est celle du bloc chiffres
(`120 MS → 53 MS`), une seule forme pour les deux usages.

> Un employeur n'est pas une techno. Il ne descend jamais dans les tags.

**Tags** — trois au maximum par ligne, même catégorie partout : des technologies et des
domaines, rien d'autre.

**Survols — deux états, pas trois :**

- **A · soulignement** — `text-decoration-line: underline`, couleur `--accent`,
  offset `var(--underline-offset)` (0.22em, proportionnel),
  épaisseur `var(--underline-thickness)` (**1px fixe**).

> L'épaisseur du soulignement est fixe, jamais proportionnelle. `from-font` la fait
> suivre la taille de police et donne un trait de 4px sous un titre de 72px — le seul
> trait gras d'une grammaire entièrement en 1px.

> Toujours `text-decoration-line`, jamais le raccourci `text-decoration` : le raccourci
> réinitialise `thickness` et `offset` à `auto` et annule silencieusement la règle
> ci-dessus.
- **B · inversion complète du bloc** — l'élément porte `data-invert-on-hover`, qui
  rebascule les tokens. Le bloc se contente de lire `--bg` et `--text` ; ses enfants
  suivent seuls. Aucun état de couleur n'est écrit dans le composant.

Tout autre effet de survol est interdit.

**Images** — filet 1px `--line`, angles droits, pas de grayscale-vers-couleur au survol,
pas de parallaxe.

**Chiffres** — éléments graphiques, pas du texte courant. `--font-serif`, `--t-h2` en
liste et `--t-hero` en case study, légende mono `--t-meta` en dessous. Toujours visibles :
un chiffre est l'information, pas une récompense de survol. Chaque ligne projet en porte
un — sinon la colonne de droite est vide.

> Les chiffres sont en `--text`, **jamais en `--accent`**. Trois chiffres accentués font
> une texture, pas un accent — même raison que pour le tracé.
Chasse tabulaire obligatoire (`font-variant-numeric: tabular-nums`) : un compteur animé
ne doit produire **aucun** décalage de mise en page.

**Schéma** — SVG inline, 1px en `--line`, angles droits, labels mono. `--accent` ne porte
que le **chemin critique**, et le trait s'arrête pile au bord des nœuds extrêmes : un
trait qui dépasse laisse deux moignons sans signification. Les nœuds masquent le trait
sous eux plutôt que de se superposer. Sous 768px, le même dessin pivote à la verticale —
cinq labels mono ne tiennent pas sur 335px. Le `<figcaption>` énonce la chaîne en toutes
lettres : le filet à 1.33:1 ne porte jamais l'information seul.

> Si le schéma ne tient pas en 1px, on simplifie le schéma. On n'ajoute pas de style.

**Adresse mail** — `--t-h2` au-dessus de 768px, `--t-h3` en dessous. 29 caractères
débordent en `--t-h2` sous 768px. La césure est autorisée **au `@` et nulle part
ailleurs** : `<wbr>` posé entre la partie locale et le domaine, avec
`word-break: keep-all` et `overflow-wrap: normal` pour que la partie locale ne se coupe
jamais au milieu. Gabarit vérifiable dans `/styleguide`, section (11).

**Grain** — écarté, définitivement. Ne pas reproposer.

---

## 8 · Motion

- Librairies : **GSAP + ScrollTrigger + Lenis**. Rien d'autre.
- Courbe **unique** sur tout le site : `--ease`. Durées et décalages en §2.

**Reveal** = `translateY(var(--reveal-y))` + `opacity`. Pas de rotation, pas de blur.
Les paragraphes s'animent **ligne par ligne**, jamais lettre par lettre.

> Pas de scale sur un bloc de contenu. `scaleX` autorisé sur un filet 1px le long
> de son propre axe — c'est un tracé, pas une mise à l'échelle.

### Effet signature — « le tracé »

Un seul effet sur tout le site. Les filets ne sont pas dessinés au chargement : ils se
tracent de gauche à droite à l'entrée de leur section.

| Paramètre | Valeur |
|---|---|
| Transformation | `scaleX: 0 → 1`, `transform-origin: left` |
| Durée | `--d-base` (0.9s) |
| Courbe | `--ease` |
| Décalage | `--stagger` (0.06s) entre filets d'une même section |
| Déclenchement | ScrollTrigger, `once: true` — **jamais de re-trace au retour** |
| Start | `top 75%` desktop · **`top 85%` sous 768px**, pour que le trait finisse avant d'être lu |

**Portée — la contrainte qui en fait une signature :**

- Tracent : les **séparateurs de section** et les **lignes de la liste projets**.
- N'attendent pas : tous les filets internes aux blocs denses apparaissent
  instantanément en `scaleX(1)`.

Si tous les filets tracent, l'effet devient une texture et cesse d'être une signature.

`prefers-reduced-motion: reduce` → `scaleX(1)` immédiat, **aucun trigger créé**.

### Aucun état masqué avant que le motion soit là

> Le CSS ne pose jamais d'état masqué. Une règle adossée à `html.js` ouvrirait une
> fenêtre : la classe est posée avant la peinture, alors que `lib/motion.js` arrive en
> `import()` différé. Sur réseau lent le contenu resterait invisible pendant toute la
> fenêtre — et pour de bon si le chunk échoue.

Le masquage est posé par `lib/motion.js`, une fois chargé, selon deux cas :

- **Le chunk arrive pendant le loader** — l'écran est couvert, on masque tout
  (`prime`). Le reveal du hero joue normalement à la levée.
- **Le chunk arrive après** — on ne masque **que ce qui est hors écran**. Ce que
  l'utilisateur a déjà lu ne disparaît jamais pour réapparaître.
- **Le chunk n'arrive pas** — rien n'est masqué, la page est entière, elle a
  simplement perdu ses animations.

Vérifié en conditions réelles : chunk retiré du build (jamais livré) → 0 élément
masqué, page intégralement lisible ; chunk bridé à 3 s via proxy, soit bien après la
levée du loader à 1.2 s → 0 élément masqué **à l'écran**, le tracé joue quand même au
défilement sur ce qui est plus bas.

`prefers-reduced-motion: reduce` → durées à 0.01ms, `--reveal-y` à 0, tout s'affiche
instantanément, site 100 % lisible. Déjà câblé dans `tokens.css`.

---

## 9 · Interdits

Ne produire **jamais** :

- dégradés violet / indigo / bleu-rose, mesh gradients, blobs SVG
- glassmorphism : `backdrop-blur` + bordure blanche translucide + carte flottante
- émojis, en icône ou ailleurs
- `border-radius` > 4px hors cercles parfaits
- `box-shadow` diffuse, éléments qui « flottent »
- la grille 3 colonnes icône + titre + deux lignes de texte
- les couleurs Tailwind par défaut — tokens uniquement
- hero centré avec double CTA
- barres de compétences en pourcentage, nuage de logos de technos
- toggle dark/light, particules, curseur custom
- grain de bruit
- coordonnées GPS en footer — tic d'agence, ça se voit que c'est repris
- les formulations « Hi, I'm Alex », « Let's build something amazing together »,
  « Passionate about… », « Crafting digital experiences »

---

## 10 · Accessibilité et performance

**Critères d'acceptation**

- Lighthouse : perf ≥ 95, accessibilité = 100, best practices ≥ 95
- LCP < 2s · CLS < 0.1 · JS initial < 150 kb gzip
- Contraste texte ≥ 4.5:1 **partout**
- Navigable au clavier, focus visible, contenu lisible avec JS désactivé
- Testé à 375px, 768px, 1440px, 1920px
- 3 familles de police maximum, subset latin
- Zéro valeur codée en dur hors tokens

**Acquis à l'étape 0**

- `/styleguide` est prérendu statiquement : contenu intégralement lisible sans JavaScript.
- `prefers-reduced-motion` câblé dans les tokens.
- `:focus-visible` outillé sur toute la portée `[data-editorial]`.
- Budget fonts : 105 kB, `font-display: swap`, subset latin, self-hosted.
- Aucun débordement horizontal mesuré à 375, 768, 1440 et 1920.
- Échelle typographique vérifiée au rendu aux quatre largeurs.
- Audit passé : aucune valeur de design codée en dur hors `tokens.css`.

**Mesuré aux étapes 1 à 3** — sur la home, à 375, 414, 500, 768, 1440 et 1920 :

- zéro débordement horizontal
- zéro paire texte / fond sous 4.5:1
- échelle typographique conforme au tableau §5
- zéro décalage de mise en page à la révélation de l'aperçu (place réservée d'avance)
- **JS initial : 121.9 kB gzip** — budget 150 kB tenu, GSAP et Lenis différés

**Non mesuré à ce stade** — Lighthouse, LCP, CLS. Ces mesures n'ont de sens qu'une fois
toutes les sections assemblées : étape 8.

---

## 11 · Structure du site

| Bloc | Contenu |
|---|---|
| Loader | Compteur % en mono sur `--bg`. 1.2s max. |
| Nav | Filet 1px en bas, mono 11px uppercase, pas de logo image. Sous 768px seuls les numéros restent visibles — les libellés passaient la nav à trois lignes et 99px de haut. Le libellé demeure dans le nom accessible du lien. |
| Hero | `(00) — ALEX PANTA` / nom en `--t-hero` / une ligne de positionnement / lieu + année en mono. Rien d'autre. Pas de bouton. |
| (01) Work | 3 projets en liste éditoriale : ligne, numéro, titre, année, tags mono. Pas de cartes. Le survol révèle l'aperçu. Reste sur papier. |
| Case study | Template dédié : contexte / contrainte / architecture / résultat chiffré. |
| (02) System | Fiche technique en colonnes mono, une ligne par groupe. **Seule section inversée** du site — porte `[data-theme="invert"]`, pleine largeur. Pas de barre de niveau, pas de logo, pas d'icône. |
| (03) Contact | Bloc **pleine largeur** : l'adresse fait 1034px en `--t-h2` à 1440, elle ne tient pas dans huit colonnes. Adresse en `--accent`, statut et liens en mono. Pas de formulaire. |
| Footer | Filet 1px, mono : `ALEX PANTA · PARIS · 2026` et les mentions `Alexandru Panta`. Pas de fuseau horaire — `CET`/`CEST` est la même imprécision qu'un décalage codé en dur, et un fuseau en footer ne dit rien que `PARIS · 2026` ne dise déjà. |

**Langue** — labels meta en anglais (`(01) — SELECTED WORK`), corps de texte en
français. Les labels sont nommés en anglais par la commande elle-même ; la cible est
française. Décision à confirmer.

**Contenu réel** — aucun projet inventé :

- **ZoeCare / ZoeFall** — plateforme IoT de détection de chute, alternance SATT Paris-Saclay
- **AB Tasty** — tag de tracking EmotionsAI optimisé de 120ms à 53ms de blocking time (−56%)
- **Homelab** — iMac 2009 recyclé en serveur Debian : média, réseau, VPN

---

## 12 · Case studies

Template : **contexte / problème / contrainte / architecture / résultat chiffré / stack**.
Le label de section, le titre en `--t-hero`, le contexte démarrant colonne 5.

**Confidentialité** — un CV se transmet, un site se publie. Aucun établissement, aucun
résident, aucun système téléphonique client n'est nommé. On reste au niveau des briques
d'infra standard.

**Les `todo` sont des phrases qu'Alex écrit lui-même.** Elles ne se rédigent pas à sa
place : l'emplacement est réservé et marqué, il reste vide.

**Règle éditoriale du (02) SYSTEM** — la section ne liste **que** ce qui apparaît dans un
case study. Pas de recopie de CV, pas de techno sans preuve derrière. Si ça n'est pas
dans une des trois pages, ça ne s'affiche pas.

Les trois pages sortent d'un seul gabarit : `pages/work/[slug].js`, alimenté par
`content/copy.js`. Zéro variation possible — il n'y a qu'un composant.

---

## 13 · En attente de contenu

Rien n'est inventé. Ces marques restent visibles dans `/styleguide` jusqu'à ce que
l'information arrive.

- `TODO:` les trois aperçus projets. L'emplacement est réservé au bon ratio, filet 1px,
  **aucune image de remplacement** — il reste vide jusqu'à l'arrivée des visuels.
- `TODO:` ZoeCare — *le problème*, *la contrainte*, et un second chiffre publiable.
- `TODO:` AB Tasty — *le problème*, *la contrainte*, et la chaîne du tag si elle est
  publiable. Sans elle, pas de schéma : le gabarit en accepte un, on ne l'invente pas.
- `TODO:` Homelab — *le problème*, *la contrainte*, *l'architecture* et *le résultat*.
  Quatre sur cinq : la page existe et le gabarit tient, mais elle n'est pas publiable
  en l'état.

---

## 14 · Carte des fichiers

```
DESIGN.md                      ce document — référence normative
content/copy.js                toutes les chaînes de copie, prêtes pour une
                               version EN — rien de rédactionnel dans le JSX
styles/tokens.css              tokens, portée inversée, socle éditorial, primitives
                               [data-trace] et [data-reveal]
lib/motion.js                  runtime motion : Lenis, ScrollTrigger, le tracé,
                               les reveals. Chargé en import() différé.
pages/_document.js             pose la classe `js` avant la peinture, précharge
                               Satoshi et JetBrains Mono
pages/index.js                 la home — loader, nav, hero, (01) Selected work
pages/work/[slug].js           gabarit unique des trois case studies, schéma
                               SVG inline. getStaticPaths + getStaticProps,
                               les trois pages sont prérendues.
styles/CaseStudy.module.css    habillage du template de case study
styles/Home.module.css         habillage de la home
pages/styleguide.js            /styleguide — vérification visuelle du système
styles/Styleguide.module.css   habillage de la route de contrôle
public/fonts/*.woff2           4 fichiers, 105 kB, subset latin
```

**Le verrou sans JavaScript** — `pages/_document.js` pose `class="js"` sur `<html>`
avant la peinture. Elle seule autorise un état de départ masqué : `[data-reveal]` à
opacity 0, `[data-trace]` à `scaleX(0)`, et l'affichage du loader. Sans JavaScript,
aucun de ces états n'existe : la page est entière, le loader n'apparaît jamais.

**Le motion est différé** — `lib/motion.js` est chargé en `import()` après
l'hydratation. GSAP et Lenis ne servent pas au premier rendu et resteraient 54 kB gzip
de trop dans le JS initial.

**Portées** — `tokens.css` déclare ses tokens sur `:root`, les rebascule sous
`[data-theme="invert"]` et `[data-invert-on-hover]:hover`, et pose son socle d'éléments
sous `[data-editorial]`. Toute nouvelle page du site porte `data-editorial` sur son
élément racine. La barre de défilement est neutralisée au niveau `html`, **hors de toute
portée** : scopée, le dégradé de l'ancien thème reviendrait sur la moindre page non couverte.

---

## 15 · Dette

**Soldé à l'étape 1**

- `styles/globals.css`, `components/*` et les modules de l'ancien thème sombre :
  supprimés. Les renommages `--legacy-*` sont partis avec eux.
- `pages/_document.js` ne charge plus Inter, Orbitron et Space Grotesk depuis Google
  Fonts. Plus aucune requête de police tierce.
- `react@18.1.0` ne correspondait pas à `next@16.0.7`, qui attend React 19. Aligné en
  `react@19.3.0` / `react-dom@19.3.0`. `react-scroll`, les trois paquets FontAwesome et
  la chaîne Jest (aucun test dans le dépôt) sont retirés.
- `npm audit` : 4 vulnérabilités (dont 1 critique sur Next) corrigées, Next en 16.3.5.
  0 vulnérabilité restante.
- `.next/` n'est plus versionné. Vérification faite avant retrait : aucune variable
  d'environnement applicative dans les bundles committés, seulement les drapeaux
  internes de Next et la sentinelle `ReactPropTypesSecret` de React.

**Restant**

- `public/` contient encore 21 images et vidéos de l'ancien site. À supprimer quand les
  vrais aperçus projets arriveront, pour ne pas effacer un fichier encore utile.
- La navigation liste les trois sections ; les trois ancres existent.
- Les trois lignes projet sont de vrais `<a>`, vers les trois case studies.

## 16 · Checklist avant chaque bloc

1. Relire §9. Aucun interdit présent ?
2. Aucune valeur de design hors token ? `grep -nE "#[0-9A-Fa-f]{3,8}|[0-9]+(px|rem)"` sur le CSS.
3. Label meta présent sur la section ?
4. Rupture d'alignement volontaire présente ?
5. Espacement inter-sections ≥ `--s7` desktop, `--s6` mobile ?
6. Budget accent toujours ≤ 3 en home ?
7. Contraste ≥ 4.5:1 sur toute paire texte / fond, dans les deux portées ?
8. Lisible avec JS désactivé ? Navigable au clavier, focus visible ?
9. Vérifié à 375, 768, 1440, 1920.
