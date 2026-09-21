/* Chargement des trois familles par next/font/local.

   Toujours self-hosted et subset latin, comme avant — mais next/font
   génère en plus une police de repli aux métriques ajustées
   (`size-adjust`, `ascent-override`…) dérivées du fichier réel. Le texte
   affiché pendant le `swap` occupe alors la même place que la police
   finale : c'est le CLS qui tombe, pas seulement le confort.

   Les noms de familles sont hachés au build : next/font les injecte en
   --font-*-src, et tokens.css compose les piles --font-* par-dessus.
   Les valeurs passées ici doivent être des littéraux — next/font refuse
   toute expression. */

import localFont from 'next/font/local';

export const display = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  weight: '300 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-display-src',
  adjustFontFallback: 'Arial',
  fallback: ['General Sans', 'system-ui', 'sans-serif'],
});

export const mono = localFont({
  src: '../public/fonts/JetBrainsMono-latin.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-mono-src',
  adjustFontFallback: 'Arial',
  fallback: ['ui-monospace', 'monospace'],
});

export const serif = localFont({
  src: [
    { path: '../public/fonts/InstrumentSerif-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/InstrumentSerif-Italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif-src',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'serif'],
});

export const fontVariables = `${display.variable} ${mono.variable} ${serif.variable}`;
