# Assessment & Roadmap

## Summary
A thin enrichment layer over `i18n-iso-countries`: capital, currency, languages, time zones, TLD per country, with data generated at build time. Solid release hygiene and a data-sync guard. Main weaknesses: duplicated per-key service classes, mostly-optional types, a single non-tree-shakeable 195 KB dataset, a very wide public API, and tests that mock the base library (which hid the missing-locale bug).

## Findings
- Four near-identical service classes all delegate to the ISO-2 service; a single resolver would remove ~150 lines.
- Four "views" (location/currency/general/detail) force a choice; most callers want the full record.
- Types: nearly every field optional; `timeZones`/`domain` should be verified in the public types.
- Dataset is pulled in wholesale by any import; CJS only, no `exports` map.
- 18 exports with very long names; mixed throw / `undefined` failure modes.
- `jest.setup.js` mocks `i18n-iso-countries`, so integration bugs go unnoticed.

## Proposed features (ranked)
| # | Feature | Status |
|---|---------|--------|
| 1 | Single `getCountry(anything)` (ISO-2, ISO-3, numeric, or name) returning the full record | **done** |
| 2 | Reverse lookups: by currency, calling code, TLD, time zone, continent, language | proposed |
| 3 | Tree-shakeable output: ESM + CJS, `exports` map, data as a separate import | **done** (tsup; `/data` subpath; see notes) |
| 4 | Stricter types: required fields where data is complete, `CountryCode` literal union | proposed |
| 5 | Multi-language names via a `lang` option | proposed |
| 6 | Time-zone helpers: current UTC offset with DST, business-hours check | proposed |
| 7 | Formatting helpers: `Intl.NumberFormat` currency, phone prefix, flag | proposed |
| 8 | More data: driving side, measurement system, postal-code regex | proposed |
| 9 | Scheduled CI job refreshing the dataset and opening a PR | proposed |
| 10 | Integration tests against the real library + packed-tarball smoke test | **done** |

## Order of work
10 → 1 → 3: fix quality and ergonomics before adding data.

## Implementation notes
- **#10** `src/tests/integration/*` run against the real library via its `index` entry (no auto-registered locales), so they fail if the package stops registering `en`. `npm run test:pack` packs the tarball, installs it into an empty project and calls it from CJS and ESM.
- **#1** `getCountry(input)` accepts ISO-2/ISO-3/numeric (string or number) or an English name. It is the only API that exposes `timeZones`, `domain` and `dateFormat`; the older `*Detail*` functions never returned them despite the README claiming so.
- **#3** `tsup` builds `dist/` (ESM + CJS + types) with an `exports` map and `sideEffects: false`. The dataset is also importable alone from `i18n-iso-countries-extended-info/data`. The library is imported via `i18n-iso-countries/index.js` because its default Node entry is `module.exports = library`, which Node ESM cannot expose as named imports. The `en` locale JSON is inlined for the same reason (Node ESM needs a JSON import attribute).
- Caveat: the dataset is still one ~195 KB chunk; any lookup function loads all of it. Splitting per-country data would be a separate change.
