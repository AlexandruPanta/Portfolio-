/* Garde-fou de publication.

   Un trou de contenu dans content/copy.js ne doit pas pouvoir partir en
   production par accident : ce script fait échouer `npm run build`.

   Deux formes de trou sont détectées :
     - un champ `todo:`          — une section dont le texte reste à écrire
     - un littéral `TODO:`       — un aperçu manquant, un domaine non fixé

   `todoMark` est exclu : c'est le libellé affiché du gabarit, pas un trou.

   Contournement explicite pour les builds locaux :
     ALLOW_TODO=1 npm run build
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
    if (text.startsWith('//') || text.startsWith('*')) return false;
    if (/\btodoMark\s*:/.test(text)) return false;
    return /^todo\s*:/.test(text) || text.includes('TODO:');
  });

if (holes.length === 0) {
  console.log(`check-todo · ${label} — aucun trou de contenu.`);
  process.exit(0);
}

const head = `check-todo · ${holes.length} trou${holes.length > 1 ? "s" : ""} de contenu dans ${label}`;

if (process.env.ALLOW_TODO === '1') {
  console.log(`${head} — ALLOW_TODO=1, build local autorisé.`);
  for (const { line, text } of holes) console.log(`  ${label}:${line}  ${text.slice(0, 92)}`);
  process.exit(0);
}

console.error(`\n${head}. Build interrompu.\n`);
for (const { line, text } of holes) console.error(`  ${label}:${line}\n    ${text.slice(0, 116)}\n`);
console.error('Écris ces passages, ou relance avec ALLOW_TODO=1 pour un build local.\n');
process.exit(1);
