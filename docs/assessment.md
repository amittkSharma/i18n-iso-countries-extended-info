# Assessment & Roadmap

Only open work is listed here. Finished work lives in `CHANGELOG.md` and the git history.

## Summary
`getCountry`, `findCountries`, `formatCurrency`, `getUtcOffset` and `getAllCountriesAlphaCodes` over a bundled dataset of 250 countries, with ESM + CJS builds, strict types, translated names, CI and a 1.x → 2.x migration guide. What is left is new capability, not cleanup.

## Open features (ranked)
| # | Feature | Effort | How |
|---|---------|--------|-----|
| 1 | **Scheduled dataset refresh:** CI job that rebuilds the dataset and opens a PR when upstream sources change | 1–2 h (or about 10 min with Dependabot only) | Only time zones, domains and the country list come from npm packages; currencies, flags, languages and capitals are hand-maintained in `src/prebuildStep/rawCountryData/`. PRs opened with the default token do not trigger CI, so the job would run the tests itself. Keep `npm publish` manual. |
| 2 | **More data:** driving side, measurement system, postal-code patterns, phone area codes | needs a source | Each field needs a vetted upstream source and a sync check like the existing ones. Area codes for the shared `+1`/`+44` plans would let `phoneNumber` tell the US from Canada. |

Suggested order: 1, then 2 when a data source is chosen.

## Open issues
- **Dataset size:** one ~200 KB chunk; any lookup loads all of it. Splitting per country would be a separate restructuring.
- **Shared time zones:** zone lists come from `countries-and-timezones`, which links tz-database zones that share history to several countries (for example `Asia/Tokyo` is listed for both `JP` and `AU`; `Europe/Berlin` for `DE`, `DK`, `NO`, `SE`, `SJ`). I could not verify the Australian link, so it is unchanged; it makes `findCountries({ timeZone: "Asia/Tokyo" })` return `AU` as well.
- **Antarctica (`AQ`)** is listed with currency `EUR`, which inflates the EUR count to 37.
- **Missing values** are empty strings (`capital` for 5 countries, `currencyName` for 8, `officialLanguageName` for 8), and `dateFormat` is missing for 156.
- **Pending release:** the version in `package.json` is 2.0.0 and the work since then (localized names, `numeric`, `.uk` and domain fixes, `getUtcOffset`, `callingCodes`, `phoneNumber`, ISO-3 types) is not released. The repository is public and the CI workflow has passed on GitHub (about 45 s per run, free).

## Notes for future work
- **Calling codes** in the dataset are not plain ITU codes: the North American plan is stored as area codes (`1268`, `1809`…), Svalbard as `4779`, the Caribbean Netherlands as `5997`/`5999`. `findCountries` expands `1`, `47` and `599` to match; `src/tests/dataset.test.ts` fails if a new family of long codes appears.
- **Names:** the dataset's country names differ from the `i18n-iso-countries` names for 18 countries (`Brunei` vs `Brunei Darussalam`); `resolveIso2` accepts both.
- **Library quirk:** `toAlpha2("XX")` returns `"XX"`, so `resolveIso2` also requires a dataset entry.
- **README is hand-written** (no generator), so update it together with the doc comments in `src/countryIsoInformationService.ts` when the API changes.
- **Release:** commit, then `npm run release` (`-- --release-as minor` for the next release).
