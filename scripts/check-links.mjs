// Checks the built site (dist/): every internal link must reach a page, every #anchor must
// exist on that page, and every redirect target in scripts/redirects.mjs must exist too.
// Run after `npm run build`.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, posix } from 'node:path';

const BASE = '/SOVLRules';
const DIST = 'dist';

const pages = new Map(); // site path -> Set of ids
const links = []; // { from, href }

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === '_astro' || name === 'pagefind' || name === '__test') continue;
      walk(full);
    } else if (name.endsWith('.html')) {
      const rel = '/' + relative(DIST, full).split('\\').join('/');
      const html = readFileSync(full, 'utf8');
      const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      const path = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
      pages.set(path, ids);
      if (html.includes('http-equiv="refresh"')) continue; // redirect stubs are checked separately
      for (const m of html.matchAll(/\shref="([^"]+)"/g)) links.push({ from: path, href: m[1] });
    }
  }
}

function resolve(from, href) {
  if (/^(https?:|mailto:|data:)/.test(href)) return null;
  let [path, hash = ''] = href.split('#');
  if (path === '') path = from;
  else if (!path.startsWith('/')) path = posix.join(posix.dirname(from.endsWith('/') ? from + 'x' : from), path);
  else if (path.startsWith(BASE)) path = path.slice(BASE.length) || '/';
  else return { error: `absolute link outside base: ${href}` };
  if (!path.endsWith('/') && !path.endsWith('.html') && !/\.[a-z0-9]+$/i.test(path)) {
    path = pages.has(path + '/') ? path + '/' : path + '.html';
  }
  return { path, hash: decodeURIComponent(hash) };
}

walk(DIST);
const errors = [];

for (const { from, href } of links) {
  if (href.startsWith(BASE + '/_astro/') || href.endsWith('.css') || href.endsWith('.ico') || href.includes('/pagefind/')) continue;
  const r = resolve(from, href);
  if (!r) continue;
  if (r.error) { errors.push(`${from}: ${r.error}`); continue; }
  const ids = pages.get(r.path);
  if (!ids) {
    if (!existsSync(join(DIST, r.path))) errors.push(`${from}: broken link ${href}`);
    continue;
  }
  if (r.hash && !ids.has(r.hash)) errors.push(`${from}: missing anchor ${href}`);
}

const { REDIRECTS } = await import('./redirects.mjs?check');
for (const [from, { to, anchors }] of Object.entries(REDIRECTS)) {
  for (const target of [to, ...Object.values(anchors)]) {
    const r = resolve('/', BASE + target);
    const ids = pages.get(r.path);
    if (!ids) errors.push(`redirect ${from} -> ${target}: no such page`);
    else if (r.hash && !ids.has(r.hash)) errors.push(`redirect ${from} -> ${target}: no such anchor`);
  }
}

console.log(`checked ${links.length} links on ${pages.size} pages`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('all links and anchors resolve');
