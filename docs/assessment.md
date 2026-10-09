# Assessment & Roadmap

## Summary
A thin enrichment layer over `i18n-iso-countries`: capital, currency, languages, time zones, TLD per country, with data generated at build time. Solid release hygiene and a data-sync guard. Main weaknesses: duplicated per-key service classes, mostly-optional types, a single non-tree-shakeable 195 KB dataset, a very wide public API, and tests that mock the base library (which hid the missing-locale bug).

## Findings
- ~~Four near-identical service classes~~ — **fixed**: one `createCountryInfoService(toIso2)` factory in `src/services/lookupServices.ts`; each lookup key only supplies its resolver. The four country-info helpers share one `getCountrySource` lookup.
- Four "views" (location/currency/general/detail) force a choice; most callers want the full record.
- Types: nearly every field optional. ~~`timeZones`/`domain` missing from public types~~ — **fixed**: detail results now include `timeZones`, `domain`, `dateFormat`.
- Dataset is pulled in wholesale by any import (still true). ~~CJS only, no `exports` map~~ — **fixed** (#3).
- ~~18 exports with very long names; mixed throw / `undefined` failure modes~~ — **fixed in 2.0.0**: 4 functions (`getCountry`, `findCountries`, `formatCurrency`, `getAllCountriesAlphaCodes`) plus `COUNTRY_CODES`; every lookup failure throws `Country can not be found for: <input>`.
- `jest.setup.js` mocks `i18n-iso-countries`, so integration bugs go unnoticed — **mitigated** by integration tests (#10); unit tests still mock.
- ~~`package-lock.json` listed only the macOS-x64 Biome binary, so `npm install` skipped Biome on other platforms~~ — **fixed**: all platform binaries locked; `biome.json` now ignores generated data and `coverage`.

## Proposed features (ranked)
| # | Feature | Status |
|---|---------|--------|
| 1 | Single `getCountry(anything)` (ISO-2, ISO-3, numeric, or name) returning the full record | **done** |
| 2 | Reverse lookups: by currency, calling code, TLD, time zone, continent, language | **done** (`findCountries`) |
| 3 | Tree-shakeable output: ESM + CJS, `exports` map, data as a separate import | **done** (tsup; `/data` subpath; see notes) |
| 4 | Stricter types: required fields where data is complete, `CountryCode` literal union | **step 1 done**; step 2 (narrow inputs to `CountryCode`) needs a major version |
| 5 | Multi-language names via a `lang` option | **done** (`{ locale }` option, via `Intl.DisplayNames`) |
| 6 | Time-zone helpers: current UTC offset with DST, business-hours check | proposed |
| 7 | Formatting helpers: `Intl.NumberFormat` currency, phone prefix, flag | **currency done** (`formatCurrency`); phone prefix and flag not started (the data already holds both) |
| 8 | More data: driving side, measurement system, postal-code regex | proposed |
| 9 | Scheduled CI job refreshing the dataset and opening a PR | proposed |
| 10 | Integration tests against the real library + packed-tarball smoke test | **done** |

## Order of work
10 → 1 → 3: fix quality and ergonomics before adding data.

## Implementation notes
- **#10** `src/tests/integration/*` run against the real library via its `index` entry (no auto-registered locales), so they fail if the package stops registering `en`. `npm run test:pack` packs the tarball, installs it into an empty project and calls it from CJS and ESM.
- **#1** `getCountry(input)` accepts ISO-2/ISO-3/numeric (string or number) or an English name and returns the detail record plus `iso2`/`iso3`.
- **Detail bug fix** The `*Detail*` functions previously omitted `timeZones`, `domain` and `dateFormat` although the README advertised them. `getCountryDetailInfo` now merges them via `getAdditionalInfoByCountryIso2Code`; `CountryDetailInformation` extends `Others`. General/location/currency views are unchanged.
- **#3** `tsup` builds `dist/` (ESM + CJS + types) with an `exports` map and `sideEffects: false`. The dataset is also importable alone from `i18n-iso-countries-extended-info/data`. The library is imported via `i18n-iso-countries/index.js` because its default Node entry is `module.exports = library`, which Node ESM cannot expose as named imports. The `en` locale JSON is inlined for the same reason (Node ESM needs a JSON import attribute).
- **Locale note:** `i18n-iso-countries`' Node entry auto-registers all locales; only browser/bundler use needs the package's own `registerLocale(en)`.
- Caveat: the dataset is still one ~195 KB chunk; any lookup function loads all of it. Splitting per-country data would be a separate change.

## #2 / #4 / #7 notes
- **`findCountries(filter)`**: filters `currency`, `callingCode`, `domain`, `timeZone`, `continent`, `language`; AND across filters, case-insensitive, ordered by ISO-2, `[]` for no match, empty filter returns all 250. Unknown keys and wrong value types throw (a typo must not silently return every country). Results are fresh copies, so mutating them cannot corrupt the dataset (the older lookup functions had the same aliasing problem; they now copy too).
- **Calling codes** in the dataset are not plain ITU codes: NANP countries are stored as area codes (`1268` for Antigua, `1809/1829/1849` for the Dominican Republic), Svalbard as `4779`, the Caribbean Netherlands as `5997`/`5999`. `callingCode: 1` therefore matches the whole +1 plan; `47` and `599` expand the same way; a bare digit prefix such as `4` matches nothing. `src/tests/dataset.test.ts` fails if a new family of long codes appears.
- **Types**: `CountryCode` and `COUNTRY_CODES` are generated with the dataset. Fields present for all 250 countries are required. Missing values are stored as empty strings (`capital` 5, `currencyName` 8, `officialLanguageName` 8), so those stay `string`; only `dateFormat` (156 missing) and `continents` (243 missing) are optional. Alpha-2 functions take `CountryCodeInput`, which suggests codes but still accepts any string. Alpha-3 codes are not typed.
- **`formatCurrency(amount, country, options?)`**: locale is `<official language>-<ISO-2>`, falling back to the language alone, then `en` (never the machine locale). Arabic-speaking countries get Arabic digits by default; pass `locale` to override. Needs full ICU (Node default since v13). `style` and `currency` cannot be overridden.
- **Bug found while testing**: the library's `toAlpha2("XX")` returns `"XX"`, so unknown two-letter input reached the dataset lookup. `resolveIso2` now also requires a dataset entry.

## Data quality issues found (not changed)
- ~~`domain` carries a note for 5 territories, e.g. `".bv (unofficial)"`~~ — **fixed in 2.1**: `domain` is a plain TLD and `domainUnofficial: true` marks BV, EH, SJ, UM, XK.
- ~~Great Britain's domain is `.gb`~~ — **fixed in 2.1**: `.uk` (override in `fetchCountryDomain.ts`; the source library has `.gb`).
- Antarctica (`AQ`) is listed with currency `EUR`, which inflates the EUR count to 37.
- Missing values are `""`, not absent.

## 2.0.0 (breaking)
- Removed the 16 `getCountry<View>By<Key>` wrappers and `getCountryAlphaCodeByName`, and with them the service classes/factory, the per-view helper modules, the `CountryInfoService` interface and the library mock in `jest.setup.js`. `getCountryByIso2` now maps the dataset record directly. README shrank from ~760 to ~140 lines and carries a 1.x → 2.0 migration table.
- Stricter-types step 2 turned out to be moot: it only applied to the alpha-2 functions, which no longer exist; `getCountry` takes any key type, so its input stays `CountryCodeInput | number`.
- Test suite rewritten around the public API (318 tests): public-surface test, India record from every key type, round trip of all 250 countries, mutation safety, `findCountries`, `formatCurrency`, dataset invariants, compile-time type tests.
- **Bug found while porting tests**: 18 dataset names did not resolve as input (`Brunei`, `Laos`, `Moldova`, `Syria`, `Myanmar (Burma)`, `East Timor`, `Vatican City`…) because the library names them differently (`Brunei Darussalam`…). Name lookup now falls back to the dataset's own names, so `getCountry(getCountry(x).name)` always round-trips.
- Release: commit with a `BREAKING CHANGE:` footer, then `npm run release -- --release-as major` (the version in `package.json` is still 1.8.0).

## 2.1.0
- **Localized names**: `getCountry`, `findCountries` and `getAllCountriesAlphaCodes` take `{ locale }`. `name`, `currencyName` and `language.official` come from `Intl.DisplayNames`, so no data or bundle size is added. Omitted locale keeps the dataset's English names; well-formed locales without translations fall back to English (never the machine locale); malformed locales throw `RangeError`; empty dataset values stay empty. All 250 regions, currencies and official languages resolve in French (checked).
- **`numeric`** on every record: ISO 3166-1 numeric code as a zero-padded string (`"036"`). `iso3` and `numeric` are now non-optional. The dataset's own `numericCode` is the currency's code and is not exposed.
- **Domains**: see data issues above. The regenerated dataset differs from the old one only in those six domains.
- **CI**: `.github/workflows/ci.yml` runs `npm run verify` (Biome, `tsc --noEmit`, Jest) and `npm run test:pack` on Node 20 and 22. `engines` is `>=20`. All 331 tests were also run locally on Node 20.20.2. The workflow itself has not run on GitHub yet.
- **Bug found**: `checkCountryCurrencySync.ts` imported `./types/countryCurrencyInfo`, which no longer exists, so `npm start`'s `prestart` (the data pipeline) had been failing since commit `ad4be08`. Fixed.
- **Process note**: Biome's `useOptionalChain` autofix suggested a change that broke type-checking; `npm run verify` caught it, which is the case for running the type check in CI.

## Cleanup pass
- `jest.config.ts` (206 lines, almost all commented template) → 14 lines. `tsconfig.json` (56 lines of unused emit/decorator/JSX settings, excludes for paths that no longer exist) → 19 lines, and it now also type-checks tests, `devUtils` and `prebuildStep`; the old excludes are why the broken pipeline import went unnoticed. `biome.json` → defaults plus the ignore list. `.gitignore` 137 → 9 lines. `.vscode/settings.json` lost another developer's absolute paths and a spell-check word for the deleted `.npmignore`.
- Removed the unused `tslib` dev dependency (helpers are no longer emitted), the unused `CountryProperty` type, and every `biome-ignore` / `any` in `src` (Biome now reports 0 warnings).
- Fixed `writeFile`'s error message (said "read"), and the no-op `log.info;("…")` statement in `fetchCountryTimeZones.ts`.
- Re-running `npm run prestart` reproduces the committed dataset byte for byte.
- Not removed: `pino` / `pino-pretty` (dev logger used by the pipeline; `pino-pretty` is loaded by name, so tools like knip report it unused), `.codesight/` (untracked, created by a tool outside this repo).

## Documentation
- README rewritten as a quick-start plus a per-function reference where every example output was produced by running the built package; badges for CI, npm version, downloads, Node, types and license. The 1.x → 2.x guide moved to `docs/migration-v2.md`.
- The README is now hand-written. `readme-tsdoc` (which regenerated the API section from the doc comments on every publish) and the `docs` script were removed, because it overwrote hand-written examples; the doc comments in `src/countryIsoInformationService.ts` still feed editor tooltips. Update both places when the API changes.

## Remaining work
Proposed #6 (offset helper), #8, #9 and the phone-prefix/flag part of #7 are untouched. Still open: single 195 KB dataset chunk, Antarctica listed with currency `EUR`, missing values stored as `""`, two `noExplicitAny` warnings in `src/prebuildStep`.
