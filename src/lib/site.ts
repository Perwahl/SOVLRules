export const ARMY_BUILDER_URL = 'https://perwahl.github.io/sovl-army-builder/';
export const STEAM_URL = 'https://store.steampowered.com/app/1870300/SOVL';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a site path with the GitHub Pages base. */
export function url(path: string): string {
  if (/^https?:/.test(path)) return path;
  return base + (path.startsWith('/') ? path : '/' + path);
}

export interface NavItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** The rules, in reading order. Prev/next links follow this list. */
export const RULES_NAV: NavGroup[] = [
  {
    title: 'Learn to Play',
    items: [
      { title: 'How a Battle Works', href: '/rules/' },
    ],
  },
  {
    title: 'The Rules',
    items: [
      { title: 'Units', href: '/rules/units/' },
      { title: 'The Battlefield', href: '/rules/battlefield/' },
      { title: 'The Turn', href: '/rules/turn/' },
      { title: 'Charge Phase', href: '/rules/charge-phase/' },
      { title: 'Strategic Phase', href: '/rules/strategic-phase/' },
      { title: 'Combat Phase', href: '/rules/combat-phase/' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Quick Reference', href: '/reference/' },
      { title: 'Glossary', href: '/reference/glossary/' },
      { title: 'Building an Army', href: '/armies/' },
    ],
  },
];

export const RULES_ORDER: NavItem[] = RULES_NAV.flatMap((g) => g.items);

export const TOP_NAV: NavItem[] = [
  { title: 'Learn', href: '/rules/' },
  { title: 'Rules', href: '/rules/units/' },
  { title: 'Armies', href: '/armies/' },
  { title: 'Reference', href: '/reference/' },
];
