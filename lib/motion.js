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

/**
 * L'effet signature. Ne s'applique QU'aux filets marqués [data-trace] :
 * séparateurs de section et lignes de la liste projets. Les filets
 * internes aux blocs denses restent instantanés — sinon l'effet devient
 * une texture et cesse d'être une signature.
 */
export function initTrace(scope) {
  if (prefersReducedMotion()) return;
  register();

  const groups = gsap.utils.toArray(scope.querySelectorAll('[data-trace-group]'));

  groups.forEach((group) => {
    const lines = gsap.utils.toArray(group.querySelectorAll('[data-trace]'));
    if (!lines.length) return;

    gsap.to(lines, {
      scaleX: 1,
      duration: seconds('--d-base', 0.9),
      ease: 'site',
      stagger: seconds('--stagger', 0.06),
      scrollTrigger: { trigger: group, start: startFor(), once: true },
    });
  });
}

/**
 * Reveal de contenu. translateY + opacity, jamais autre chose.
 * Les paragraphes marqués [data-reveal-lines] sont découpés en LIGNES,
 * jamais en lettres.
 */
export function initReveals(scope) {
  if (prefersReducedMotion()) return;
  register();

  const duration = seconds('--d-base', 0.9);
  const stagger = seconds('--stagger', 0.06);
  const start = startFor();

  gsap.utils.toArray(scope.querySelectorAll('[data-reveal]')).forEach((el) => {
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
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'splitLine',
      autoSplit: true,
    });
    gsap.set(el, { opacity: 1 });
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

export function refresh() {
  if (registered) ScrollTrigger.refresh();
}
