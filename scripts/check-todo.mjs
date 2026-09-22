/* Garde-fou de publication.

   Un trou de contenu dans content/copy.js ne doit pas pouvoir partir en
   production par accident : ce script fait échouer `npm run build`.

   Ne comptent que les trous qui bloquent vraiment :
     - un champ `todo:`   — une section dont le texte reste à écrire
     - un littéral `TODO:` — le domaine, tant qu'il n'est pas fixé

   Ce qui est optionnel ne bloque pas : un aperçu image absent vaut
   `preview: null`, la ligne tient avec son chiffre.

   Contournement, pour les préversions seulement :
     ALLOW_TODO=1 npm run build

   Il est refusé en production Vercel : la prod ne part pas avec un trou,
   même si la variable traîne dans l'environnement.
*/

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'content', 'copy.js');
const label = relative(root, file);

const holes = readFileSync(file, 'utf8')
  .split('\n')
  .map((text, i) => ({ line: i + 1, text: text.trim() }))
  .filter(({ text }) => {
    if (text.startsWith('//') || text.startsWith('*') || text.startsWith('/*')) return false;
    if (/\btodoMark\s*:/.test(text)) return false;
    return /^todo\s*:/.test(text) || text.includes('TODO:');
  });

if (holes.length === 0) {
  console.log(`check-todo · ${label} — aucun trou bloquant.`);
  process.exit(0);
}

const head = `check-todo · ${holes.length} trou${holes.length > 1 ? 's' : ''} bloquant${
  holes.length > 1 ? 's' : ''
} dans ${label}`;

const isVercelProd = process.env.VERCEL_ENV === 'production';
const bypass = process.env.ALLOW_TODO === '1';

if (bypass && isVercelProd) {
  console.error(`\n${head}.`);
  console.error(
    'ALLOW_TODO est ignoré en production Vercel — la prod ne part pas avec un trou.\n'
  );
} else if (bypass) {
  console.log(`${head} — ALLOW_TODO=1, build de préversion autorisé.`);
  for (const { line, text } of holes) console.log(`  ${label}:${line}  ${text.slice(0, 92)}`);
  process.exit(0);
} else {
  console.error(`\n${head}. Build interrompu.\n`);
}

for (const { line, text } of holes) console.error(`  ${label}:${line}\n    ${text.slice(0, 116)}\n`);
console.error('Écris ces passages, ou ALLOW_TODO=1 pour une préversion.\n');
process.exit(1);
