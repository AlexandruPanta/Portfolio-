/* Amorçage du motion, partagé par toutes les pages.

   Aucun mécanisme nouveau : le même `start` que la home, sorti dans
   un hook pour que les case studies n'en réinventent pas un second.

   GSAP et Lenis ne sont pas importés ici — c'est un import() différé,
   pour qu'ils restent hors du JS initial. */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* Avant la peinture côté client, useEffect après rendu côté serveur :
   sans ça, la page peint une image avant que le loader ne la couvre. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Portée module : survit aux navigations client, pas à un rechargement.
   C'est exactement « le premier chargement réel ». */
let loaderHasPlayed = false;
export const loaderHasAlreadyPlayed = () => loaderHasPlayed;
export const markLoaderPlayed = () => {
  loaderHasPlayed = true;
};

/**
 * @param scopeRef  racine à animer
 * @param ready     true quand le contenu peut être révélé (loader levé)
 */
export function useSiteMotion(scopeRef, ready) {
  const motionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* Toute arrivée réelle sur le site compte comme l'entrée, quelle que
     soit la page : un case study ouvert en direct puis un retour home
     ne doit pas rejouer le loader. */
  useEffect(() => {
    markLoaderPlayed();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let cancelled = false;
    import('./motion').then((mod) => {
      if (cancelled) return;
      motionRef.current = mod;
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !loaded || !scopeRef.current) return undefined;
    return motionRef.current.start(scopeRef.current);
  }, [ready, loaded, scopeRef]);
}
