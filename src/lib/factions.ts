import type { ImageMetadata } from 'astro';
import propertiesJson from '../data/properties.json';
import overridesJson from '../data/overrides.json';

// Shapes written by FBS Tools/Rules Site/Export (Assets/Editor/RulesSite/RulesSiteExporter.cs).

export interface Limit { min: number; max: number }

export interface PropertyRef { id: string; cost?: number }

export interface Selector {
  kind: 'builtIn' | 'optional' | 'pickOne' | 'spells' | 'magicItems' | 'magicBanner';
  label?: string;
  options?: PropertyRef[];
  weapons?: boolean;
  items?: boolean;
  bannerLimit?: number;
}

export interface Retinue { unitID: string; name: string; notInWarband?: boolean; mount?: boolean }

export interface Unit {
  unitID: string;
  name: string;
  modelType: string;
  points: number;
  sectionCost?: 'Half' | 'Double';
  commander?: boolean;
  solo?: boolean;
  isMount?: boolean;
  sectionBonus?: string;
  stats: Record<string, number>;
  models: Record<string, Limit>;
  maxPerArmy: Record<string, number>;
  weaponSet?: Selector;
  ranged?: Selector;
  properties?: Selector[];
  retinues?: Retinue[];
  image?: string;
  icon?: string;
}

export interface Section {
  name: string;
  kind: 'commanders' | 'mounts' | 'units';
  limits?: Record<string, Limit>;
  units: string[];
}

export interface Faction {
  id: string;
  name: string;
  dlc?: string;
  primaryColor?: string;
  secondaryColor?: string;
  sections: Section[];
  units: Record<string, Unit>;
}

export interface Property {
  name: string;
  description: string;
  type: string;
  cantrip?: boolean;
  perUnit?: boolean;
  cost?: number;
}

const factionModules = import.meta.glob<{ default: Faction }>('../data/factions/*.json', { eager: true });
const portraitModules = import.meta.glob<{ default: ImageMetadata }>('../assets/units/**/*.png', { eager: true });

export const FACTIONS: Faction[] = Object.values(factionModules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name));

const overrides = overridesJson as Record<string, string>;

export const PROPERTIES: Record<string, Property> = Object.fromEntries(
  Object.entries(propertiesJson as Record<string, Property>).map(([id, p]) => [
    id,
    { ...p, description: overrides[p.name] ?? p.description },
  ]),
);

export function property(id: string): Property | undefined {
  return PROPERTIES[id];
}

export function portrait(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  return portraitModules[`../assets/units/${path}`]?.default;
}

/** URL slug for a faction: DwarfHolds -> dwarf-holds */
export function slug(id: string): string {
  return id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** The faction's first commander with a portrait, for cards and banners. */
export function heroUnit(f: Faction): Unit | undefined {
  const commanders = f.sections.find((s) => s.kind === 'commanders');
  const ids = commanders?.units ?? [];
  return ids.map((id) => f.units[id]).find((u) => u?.image) ?? Object.values(f.units).find((u) => u.image);
}

export function unitCount(f: Faction): number {
  return f.sections.filter((s) => s.kind !== 'mounts').reduce((n, s) => n + s.units.length, 0);
}

export function anchorFor(unitID: string): string {
  return 'unit-' + unitID.replace(/[^A-Za-z0-9_-]/g, '');
}

/** Short introductions, written for the site. Keyed by faction id. */
export const FACTION_BLURBS: Record<string, string> = {
  EmpiresOfMen: 'Disciplined state regiments, gunpowder and steel, held together by knights and battle wizards.',
  GreenskinTribes: 'A howling tide of orcs and goblins. Brutal in melee, unreliable in everything else.',
  DwarfHolds: 'Slow, stubborn and hard as the mountains. Dwarfs hold the line and grind enemies down with war machines.',
  ElvenConclaves: 'Swift, skilled and few. Elven armies strike precisely and punish every mistake.',
  DeadNations: 'Endless ranks of the risen dead. They never flee, but crumble as the necromancer’s grip slips.',
  GoatmenRaiders: 'Feral warbands of the deep woods, led by minotaurs and shamans. Fast, savage and hungry.',
  AbyssalLegions: 'Armoured champions of the Abyss and their northern thralls, backed by monsters and daemons.',
  ReptilianKingdoms: 'Saurian warriors and the great beasts of the jungle. Tough skin, hard hits, and dinosaurs.',
  RatkinClans: 'Teeming ratkin hordes armed with flamers, long rifles and the dreaded Doom Bell. Quantity has a quality all its own.',
  DeepwoodGuardians: 'Elven rangers and ancient forest spirits who fight from the trees and vanish into them.',
  DarkbornElves: 'Cruel, quick and lethal. Darkborn raiders strike with crossbows, witches, assassins and monstrous beasts.',
  AbyssalDemons: 'Daemons of plague, war and trickery, spilling out of the Abyss. Fearless, strange and relentless.',
  KnightsOfAvalon: 'Peasant levies and pious knights of a chivalrous kingdom. When the lances land, nothing stands.',
};
