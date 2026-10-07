# SOVL Rules

The rules site for [SOVL: Fantasy Warfare](https://store.steampowered.com/app/1870300/SOVL), published at
**https://perwahl.github.io/SOVLRules/**.

It's an [Astro](https://astro.build) static site, deployed to GitHub Pages by `.github/workflows/pages.yml`
on every push to `main`.

## Working on it

```sh
npm install
npm run dev      # http://localhost:4321/SOVLRules/
npm run build    # dist/, plus redirect pages and the search index
npm run check    # every internal link and #anchor resolves (run after build)
```

## Where things live

| Path | What |
|---|---|
| `src/pages/rules/*.mdx` | The rules text. One page per chapter; edit these to change the rules. |
| `src/pages/armies/` | Army-building rules and the faction pages, rendered from data. |
| `src/pages/reference/` | Quick reference sheet and the glossary. |
| `src/components/diagrams/` | The SVG rules diagrams, drawn in battlefield inches. |
| `src/data/` | **Generated** army lists, properties and game constants. Don't edit by hand. |
| `src/data/overrides.json` | Corrected wording for in-game property descriptions that are out of date. |
| `src/assets/units/`, `public/unit-icons/` | **Generated** unit portraits and type icons. |
| `scripts/redirects.mjs` | Redirects from every old Jekyll URL. The game links to some of these, so keep them. |
| `SOURCES.md` | Which game code each rule comes from, for checking the text against the game. |

## Updating the army lists

The army lists, portraits and glossary come straight from the game. In the FBS Unity project, with this repo
checked out next to it (`../SOVLRules`), run **Tools → Rules Site → Export**
(`Assets/Editor/RulesSite/RulesSiteExporter.cs`). It rewrites `src/data/`, `src/assets/units/` and
`public/unit-icons/`. Only Released factions are exported. Commit the result and push.

## Old links

The game's rules-info buttons (`RulesInfoButton.cs` in FBS) link to the old Jekyll URLs such as
`docs/GameLoop/CombatPhase.html#attack-roll`. `scripts/redirects.mjs` writes a page at each old URL that
forwards to the new page and anchor, and `npm run check` fails if any target goes missing.
