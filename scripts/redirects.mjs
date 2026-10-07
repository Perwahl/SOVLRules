// Writes a redirect page at every URL of the old Jekyll site, so links from shipped game builds
// (FBS Assets/Scripts/RulesInfoButton.cs) and old bookmarks keep working. Each page maps the old
// #anchor to its new home, falling back to the page's default target.
//
// GitHub Pages serves /docs/UnitTypes from docs/UnitTypes.html, so one file covers both forms.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BASE = '/SOVLRules';
const DIST = 'dist';

const factions = {
  AbyssalDemons: 'abyssal-demons',
  AbyssalLegions: 'abyssal-legions',
  DarkbornElves: 'darkborn-elves',
  DeadNations: 'dead-nations',
  DeepwoodGuardians: 'deepwood-guardians',
  DwarfHolds: 'dwarf-holds',
  ElvenConclaves: 'elven-conclaves',
  EmpiresofMen: 'empires-of-men',
  GoatmenRaiders: 'goatmen-raiders',
  GreenskinTribes: 'greenskin-tribes',
  KnightsofAvalon: 'knights-of-avalon',
  RatkinClans: 'ratkin-clans',
  ReptilianKingdoms: 'reptilian-kingdoms',
};

/** old path (without .html) -> { to: default target, anchors: { oldAnchor: target } } */
export const REDIRECTS = {
  'docs/PlayingTheGame': { to: '/rules/', anchors: {
    'building-an-army': '/armies/',
    'gameplay': '/rules/#the-turn',
    'objective-of-the-game': '/rules/#winning',
    'rolling-dice': '/rules/#rolling-dice',
  } },
  'docs/SetupAndDeployment': { to: '/rules/battlefield/', anchors: {
    'setting-up-the-table': '/rules/battlefield/#battlefields',
    'terrain-types': '/rules/battlefield/#terrain',
    'deployment-zones': '/rules/battlefield/#deployment',
    'deployment': '/rules/battlefield/#deployment',
  } },
  'docs/Scenarios': { to: '/rules/battlefield/#scenarios-and-victory', anchors: {
    'pitched-battle': '/rules/battlefield/#pitched-battle',
    'scoring': '/rules/battlefield/#scoring',
    'scoring-objectives': '/rules/battlefield/#scoring-objectives',
  } },
  'docs/UnitTypes': { to: '/rules/units/', anchors: {
    'the-stat-block': '/rules/units/#the-stat-line',
    'discipline-and-rank-bonus': '/rules/units/#discipline-tests',
    'flight-move': '/rules/strategic-phase/#flight',
    'unit-types': '/rules/units/#unit-types',
    'commanders': '/rules/units/#commanders',
  } },
  'docs/UnitProperties': { to: '/rules/units/#properties', anchors: {
    'weapon-sets': '/rules/units/#weapon-sets',
    'charge-bonus': '/rules/units/#weapon-sets',
    'ranged-attacks': '/rules/strategic-phase/#common-ranged-weapons',
    'general-properties': '/rules/units/#common-properties',
  } },
  'docs/GameLoop/GameLoop': { to: '/rules/turn/', anchors: {
    'alternating-activations': '/rules/turn/#alternating-activations',
  } },
  'docs/GameLoop/ChargePhase': { to: '/rules/charge-phase/', anchors: {
    'declaring-a-charge': '/rules/charge-phase/#declaring-a-charge',
    'charge-side': '/rules/charge-phase/#charge-sides',
    'counter-charge': '/rules/charge-phase/#counter-charges',
    'charge-intercept': '/rules/charge-phase/#intercepting-a-charge',
    'resolve-charges': '/rules/charge-phase/#resolving-charges',
    'fleeing-from-a-charge': '/rules/charge-phase/#fleeing-from-a-charge',
  } },
  'docs/GameLoop/StrategicPhase': { to: '/rules/strategic-phase/', anchors: {
    'movement': '/rules/strategic-phase/#movement',
    'terrain': '/rules/battlefield/#difficult-terrain',
    'ranged-attacks': '/rules/strategic-phase/#ranged-attacks',
    'activated-abilities': '/rules/strategic-phase/#abilities-and-spells',
    'rally-fleeing-units': '/rules/strategic-phase/#rallying-fleeing-units',
  } },
  'docs/GameLoop/CombatPhase': { to: '/rules/combat-phase/', anchors: {
    'resolve-engagements': '/rules/combat-phase/#engagements',
    'attack-roll': '/rules/combat-phase/#attack-roll',
    'supporting-attacks': '/rules/combat-phase/#who-attacks',
    'damage-save': '/rules/combat-phase/#damage-save',
    'combat-score': '/rules/combat-phase/#combat-score',
    'break-tests': '/rules/combat-phase/#break-tests',
    'fleeing-units': '/rules/combat-phase/#fleeing',
  } },
  // Linked from the old pages but never written.
  'docs/GameLoop/EndOfGame': { to: '/rules/battlefield/#scenarios-and-victory', anchors: {} },
  'docs/EndOfGame': { to: '/rules/battlefield/#scenarios-and-victory', anchors: {} },
  'docs/FactionSource/FactionSource': { to: '/armies/', anchors: {
    'points': '/armies/#army-size',
    'army-sections': '/armies/#sections',
    'commanders': '/armies/#commanders',
  } },
  ...Object.fromEntries(Object.entries(factions).map(([old, slug]) => [`docs/FactionSource/${old}`, { to: `/armies/${slug}/`, anchors: {} }])),
};

function page(to, anchors) {
  const full = (p) => BASE + p;
  // Anchor keys are matched case-insensitively: the game links #discipline-and-rank-bonus, and
  // the old site mixed cases (#Discipline-and-Rank-Bonus).
  const map = Object.fromEntries(Object.entries(anchors).map(([k, v]) => [k.toLowerCase(), full(v)]));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved · SOVL Rules</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://perwahl.github.io${full(to)}">
<meta http-equiv="refresh" content="1; url=${full(to)}">
<script>
(function () {
  var map = ${JSON.stringify(map)};
  var hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
  location.replace(map[hash] || ${JSON.stringify(full(to))});
})();
</script>
<style>body{background:#0d131a;color:#ebe4d3;font:18px Georgia,serif;display:grid;place-items:center;min-height:90vh}a{color:#6fd0cc}</style>
</head>
<body><p>The rules have moved. <a href="${full(to)}">Continue to the new page</a>.</p></body>
</html>
`;
}

let count = 0;
for (const [from, { to, anchors }] of Object.entries(REDIRECTS)) {
  const file = join(DIST, from + '.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(to, anchors));
  count++;
}
console.log(`redirects: wrote ${count} pages`);
