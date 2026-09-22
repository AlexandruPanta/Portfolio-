/* Runtime motion du site. Un seul endroit, une seule courbe.
   Voir DESIGN.md §8. */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { CustomEase } from 'gsap/dist/CustomEase';
import Lenis from 'lenis';

export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Lit un token de durée pour que le CSS reste la source de vérité. */
const seconds = (token, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  if (!raw) return fallback;
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith('ms') ? value / 1000 : value;
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let registered = false;

function register() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  /* La courbe unique du site, à l'identique du CSS : les points de
     contrôle de cubic-bezier(0.16, 1, 0.3, 1) deviennent le chemin
     M0,0 C0.16,1 0.3,1 1,1. Aucune approximation par un power*.out. */
  CustomEase.create('site', 'M0,0 C0.16,1 0.3,1 1,1');
  registered = true;
}

/**
 * Lenis + synchronisation ScrollTrigger.
 * Ne démarre pas du tout si le mouvement réduit est demandé : le scroll
 * natif reste le meilleur scroll.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const onScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onScroll);

  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off('scroll', onScroll);
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

/** Le start dépend de la largeur : sous 768px le trait doit finir avant d'être lu. */
const startFor = () =>
  typeof window !== 'undefined' && window.innerWidth < 768 ? 'top 85%' : 'top 75%';

/** Un élément déjà lu par l'utilisateur ne doit jamais être masqué après coup. */
const offscreen = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

const revealY = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--reveal-y')
    .trim();
  return parseFloat(raw) || 24;
};

/* Note — il n'existe volontairement pas de fonction qui masque ce qui
   est déjà à l'écran. Un chargement mobile bridé a montré pourquoi : le
   loader est rendu par React, donc il monte APRÈS la première peinture
   sur un appareil lent. Le hero était visible à 271 ms, puis masqué à
   2172 ms quand le chunk motion arrivait, puis re-révélé. Du contenu
   déjà lu qui disparaît : exactement ce que la règle interdit.
   `start` ne touche donc qu'à ce qui est hors de l'écran. */

/**
 * L'effet signature. Ne s'applique QU'aux filets marqués [data-trace] :
 * séparateurs de section et lignes de la liste projets. Les filets
 * internes aux blocs denses restent instantanés — sinon l'effet devient
 * une texture et cesse d'être une signature.
 */
function trace(scope) {
  const duration = seconds('--d-base', 0.9);
  const stagger = seconds('--stagger', 0.06);
  const start = startFor();

  gsap.utils.toArray(scope.querySelectorAll('[data-trace-group]')).forEach((group) => {
    const lines = gsap.utils
      .toArray(group.querySelectorAll('[data-trace]'))
      .filter(offscreen);
    if (!lines.length) return;

    gsap.set(lines, { scaleX: 0 });
    gsap.to(lines, {
      scaleX: 1,
      duration,
      ease: 'site',
      stagger,
      scrollTrigger: { trigger: group, start, once: true },
    });
  });
}

/**
 * Reveal de contenu. translateY + opacity, jamais autre chose.
 * Les paragraphes marqués [data-reveal-lines] sont découpés en LIGNES,
 * jamais en lettres.
 */
function reveals(scope) {
  const duration = seconds('--d-base', 0.9);
  const stagger = seconds('--stagger', 0.06);
  const start = startFor();
  const y = revealY();

  gsap.utils
    .toArray(scope.querySelectorAll('[data-reveal]'))
    .filter(offscreen)
    .forEach((el) => {
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: 'site',
        delay: parseFloat(el.dataset.revealDelay || 0),
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

  gsap.utils.toArray(scope.querySelectorAll('[data-reveal-lines]')).forEach((el) => {
    if (!offscreen(el)) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    /* aria: 'none' — par défaut SplitText pose un aria-label sur
       l'élément et masque ses enfants. Un aria-label sur un <p> sans
       rôle est de l'ARIA interdit (Lighthouse le compte en échec). On
       ne découpe qu'en LIGNES : le texte reste lisible tel quel par un
       lecteur d'écran, aucune compensation n'est nécessaire. */
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'splitLine',
      autoSplit: true,
      aria: 'none',
    });
    gsap.set(el, { opacity: 1, y: 0 });
    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration,
      ease: 'site',
      stagger,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });
}

/**
 * Le nom du hero (V1.1, DESIGN.md §8) — Satoshi est variable, sa graisse
 * monte de 300 à sa valeur finale pendant le reveal, une fois, au
 * chargement seulement. --wght est un CSS custom property numérique que
 * GSAP anime directement ; --wght vaut 500 par défaut en CSS, donc un
 * chargement sans JS affiche déjà la graisse finale.
 *
 * Ni trace() ni reveals() ne conviennent ici, pour une raison précise :
 * le hero est visible dès le premier paint, sous le loader. Il échoue
 * donc systématiquement au filtre `offscreen` de reveals() — exactement
 * la garde qui empêche de rejouer le bug du commit 3045f45 (masquer du
 * contenu déjà vu). primeHero()/revealHero() contournent ce filtre pour
 * ce seul élément, mais gardent la même garantie par une autre voie :
 * primeHero() n'a le droit d'être appelée QUE si le loader couvre
 * encore l'écran à cet instant précis (voir pages/index.js, qui vérifie
 * `ready` en direct via une ref avant d'appeler cette fonction).
 *
 * Jamais au scroll : recalculer la largeur des glyphes à chaque image
 * sur un texte de 208px coûterait un reflow par frame.
 */
export function primeHero(el) {
  if (prefersReducedMotion() || !el) return;
  register();
  gsap.set(el, { opacity: 0, y: revealY(), '--wght': 300 });
}

export function revealHero(el) {
  if (prefersReducedMotion() || !el) return;
  register();
  gsap.to(el, {
    opacity: 1,
    y: 0,
    '--wght': 500,
    duration: seconds('--d-base', 0.9),
    ease: 'site',
    delay: seconds('--stagger', 0.06),
  });
}

/**
 * Le moment fort du site (V1.1, DESIGN.md §8) — la chaîne d'architecture
 * ZoeCare. Dérive entièrement du tracé : mêmes scaleX/scaleY 0→1, même
 * --ease, même --stagger. Isolée de trace()/reveals() plutôt que fondue
 * dedans : c'est une chorégraphie propre à un seul schéma, pas un
 * primitif générique — les mélanger aurait mis en risque le mécanisme
 * déjà en production sur tout le reste du site.
 *
 * Séquence : les 4 filets de chaque boîte se tracent ensemble (un coin
 * à la fois serait de la texture, pas un tracé), puis son connecteur,
 * puis la boîte suivante — CAPTEUR → SOIGNANT. Une fois la chaîne
 * entière tracée, un carré plein (6px, --text) la parcourt une fois en
 * ~1.6s, puis s'efface. Comme trace()/reveals(), ne touche jamais à un
 * élément déjà visible à l'écran.
 */
function initChain(scope) {
  const duration = seconds('--d-base', 0.9);
  const stagger = seconds('--stagger', 0.06);
  const start = startFor();

  gsap.utils.toArray(scope.querySelectorAll('[data-chain]')).forEach((wrap) => {
    if (!offscreen(wrap)) return; // déjà visible : l'état CSS de repos suffit

    const track = wrap.querySelector('[data-chain-track]');
    const steps = gsap.utils.toArray(wrap.querySelectorAll('[data-chain-step]'));
    const pulse = wrap.querySelector('[data-chain-pulse]');
    if (!track || !steps.length) return;

    const column = getComputedStyle(track).flexDirection === 'column';
    const stepGap = stagger * 2; // deux temps par boîte : bordure, puis connecteur

    ScrollTrigger.create({
      trigger: wrap,
      start,
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        steps.forEach((step, i) => {
          const edgesX = step.querySelectorAll(
            '[data-chain-edge="top"], [data-chain-edge="bottom"]'
          );
          const edgesY = step.querySelectorAll(
            '[data-chain-edge="left"], [data-chain-edge="right"]'
          );
          const connector = step.querySelector('[data-chain-connector]');
          const at = i * stepGap;

          gsap.set(edgesX, { scaleX: 0 });
          gsap.set(edgesY, { scaleY: 0 });
          tl.to(edgesX, { scaleX: 1, duration, ease: 'site' }, at);
          tl.to(edgesY, { scaleY: 1, duration, ease: 'site' }, at);

          if (connector) {
            const axis = column ? 'scaleY' : 'scaleX';
            gsap.set(connector, { [axis]: 0 });
            tl.to(connector, { [axis]: 1, duration, ease: 'site' }, at + stagger);
          }
        });

        if (pulse) {
          const size = 6;
          const distance = column
            ? track.offsetHeight - size
            : track.offsetWidth - size;
          const prop = column ? 'y' : 'x';
          const pulseStart = (steps.length - 1) * stepGap + duration;

          gsap.set(pulse, { opacity: 0, x: 0, y: 0 });
          tl.to(pulse, { opacity: 1, duration: 0.15, ease: 'site' }, pulseStart)
            .to(pulse, { [prop]: distance, duration: 1.6, ease: 'site' }, pulseStart)
            .to(pulse, { opacity: 0, duration: 0.3, ease: 'site' }, pulseStart + 1.6);
        }
      },
    });
  });
}

/**
 * Compteurs (DESIGN.md §6 originel, câblé maintenant). Un chiffre
 * marqué [data-counter] compte de 0 jusqu'à sa valeur au premier
 * passage à l'écran. Le texte SSR EST déjà la valeur finale — sans
 * JS, rien à faire, la page reste entière. Chasse tabulaire déjà
 * posée en CSS (`--figure`), donc aucune largeur ne saute pendant le
 * compte ; seule la valeur écrite change.
 */
function counters(scope) {
  const duration = seconds('--d-base', 0.9);
  const start = startFor();

  gsap.utils
    .toArray(scope.querySelectorAll('[data-counter]'))
    .filter(offscreen)
    .forEach((el) => {
      const raw = el.textContent.trim();
      const match = raw.match(/^(-|−)?\s*(\d+)(.*)$/);
      if (!match) return; // rien de numérique à compter, le texte reste tel quel
      const [, sign, digits, suffix] = match;
      const target = parseInt(digits, 10);
      const obj = { n: 0 };

      gsap.to(obj, {
        n: target,
        duration,
        ease: 'site',
        scrollTrigger: { trigger: el, start, once: true },
        onUpdate: () => {
          el.textContent = `${sign || ''}${Math.round(obj.n)}${suffix}`;
        },
      });
    });
}

/** Point d'entrée unique. Ne masque que ce qui est hors de l'écran. */
export function start(scope) {
  if (prefersReducedMotion()) return () => {};
  register();
  trace(scope);
  reveals(scope);
  initChain(scope);
  counters(scope);
  return initSmoothScroll();
}

export function refresh() {
  if (registered) ScrollTrigger.refresh();
}
