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

/** Point d'entrée unique. Ne masque que ce qui est hors de l'écran. */
export function start(scope) {
  if (prefersReducedMotion()) return () => {};
  register();
  trace(scope);
  reveals(scope);
  return initSmoothScroll();
}

export function refresh() {
  if (registered) ScrollTrigger.refresh();
}
