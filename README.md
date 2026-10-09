# i18n-iso-countries-extended-info

[![CI](https://github.com/amittkSharma/i18n-iso-countries-extended-info/actions/workflows/ci.yml/badge.svg)](https://github.com/amittkSharma/i18n-iso-countries-extended-info/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/i18n-iso-countries-extended-info)](https://www.npmjs.com/package/i18n-iso-countries-extended-info)
[![npm downloads](https://img.shields.io/npm/dm/i18n-iso-countries-extended-info)](https://www.npmjs.com/package/i18n-iso-countries-extended-info)
[![Node.js](https://img.shields.io/node/v/i18n-iso-countries-extended-info)](https://nodejs.org)
[![TypeScript types included](https://img.shields.io/npm/types/i18n-iso-countries-extended-info)](#typescript)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Everything you need to know about a country in one call: ISO codes, names, capital, languages, continent, currency, time zones and internet domain. All 250 ISO 3166-1 countries and territories, bundled with the package. No network calls, no API keys, no setup.

- **One lookup for any key:** ISO-2 (`"DE"`), ISO-3 (`"DEU"`), numeric (`276`) or English name (`"Germany"`).
- **Reverse search:** find countries by currency, calling code, domain, time zone, continent or language.
- **Money formatting:** show an amount the way people in a country write it.
- **Translated names:** country, currency and language names in any language your runtime supports.
- **Fully typed**, works with ESM and CommonJS, and you do not need to install `i18n-iso-countries` yourself.

## Quick start

```bash
npm install i18n-iso-countries-extended-info
```

```ts
import { findCountries, formatCurrency, getCountry } from "i18n-iso-countries-extended-info";

const germany = getCountry("DE");
germany.capital;   // "Berlin"
germany.currency;  // "EUR"
germany.iso3;      // "DEU"

findCountries({ currency: "EUR" }).length;   // 37

formatCurrency(1234.5, "DE");                // "1.234,50 €"
```

CommonJS works the same way:

```js
const { getCountry } = require("i18n-iso-countries-extended-info");
```

## API

| Function | What it does |
|---|---|
| [`getCountry(input, options?)`](#getcountryinput-options) | Full record for one country |
| [`findCountries(filter, options?)`](#findcountriesfilter-options) | All countries matching a currency, calling code, domain, time zone, continent or language |
| [`formatCurrency(amount, country, options?)`](#formatcurrencyamount-country-options) | An amount written in a country's currency |
| [`getAllCountriesAlphaCodes(type, options?)`](#getallcountriesalphacodestype-options) | Every ISO code with its country name |
| [`COUNTRY_CODES`](#country_codes-and-countrycode) | The 250 ISO-2 codes, and the `CountryCode` type |

### `getCountry(input, options?)`

Returns the complete record for one country.

| Parameter | Type | Description |
|---|---|---|
| `input` | `string \| number` | ISO-2 code, ISO-3 code, ISO numeric code or English country name. Case does not matter and surrounding spaces are ignored. |
| `options.locale` | `string` (optional) | Return names in this language. See [Translated names](#translated-names). |

Returns a [`Country`](#the-country-record). Throws `Error: Country can not be found for: <input>` if nothing matches.

```ts
import { getCountry } from "i18n-iso-countries-extended-info";

getCountry("DE").name;        // "Germany"
getCountry("deu").name;       // "Germany"   (ISO-3, any case)
getCountry(276).name;         // "Germany"   (numeric code)
getCountry("germany").iso2;   // "DE"        (English name)

const { capital, currency, flag, domain } = getCountry("JP");
// capital: "Tokyo", currency: "JPY", flag: "🇯🇵", domain: ".jp"

getCountry("Atlantis");       // throws Error: Country can not be found for: Atlantis
```

<details>
<summary>Full output of <code>getCountry("DE")</code></summary>

```json
{
  "iso2": "DE",
  "iso3": "DEU",
  "numeric": "276",
  "name": "Germany",
  "native": "Deutschland",
  "capital": "Berlin",
  "flag": "🇩🇪",
  "isdCodes": [49],
  "language": { "code": "de", "official": "German", "others": ["de"] },
  "continent": "EU",
  "region": "Europe",
  "currency": "EUR",
  "currencyName": "Euro",
  "symbol": "€",
  "timeZones": [
    { "name": "Europe/Berlin", "utcOffset": 60, "utcOffsetStr": "+01:00", "dstOffset": 120, "dstOffsetStr": "+02:00" },
    { "name": "Europe/Zurich", "utcOffset": 60, "utcOffsetStr": "+01:00", "dstOffset": 120, "dstOffsetStr": "+02:00" }
  ],
  "domain": ".de",
  "dateFormat": "dd.MM.yyyy"
}
```

</details>

The returned object is a copy. Change it freely; later calls are not affected.

### `findCountries(filter, options?)`

Finds every country that matches **all** the criteria you give. Results are ordered by ISO-2 code. No match returns `[]`, and an empty filter `{}` returns all 250 countries.

| Filter | Accepts | Example |
|---|---|---|
| `currency` | ISO 4217 code | `"EUR"` |
| `callingCode` | number or string, with or without `+`, spaces and dashes allowed | `49`, `"+49"`, `"+1 268"` |
| `domain` | country TLD, with or without the dot | `".de"`, `"de"` |
| `timeZone` | IANA time zone name | `"Asia/Kolkata"` |
| `continent` | code or English name | `"EU"`, `"Europe"`, `"North America"` |
| `language` | ISO 639-1 code | `"fr"` |

All matching ignores case and surrounding spaces.

```ts
import { findCountries } from "i18n-iso-countries-extended-info";

// Who uses the euro?
findCountries({ currency: "EUR" }).length;
// 37

// Who is behind +1 268?
findCountries({ callingCode: "+1 268" }).map((c) => c.name);
// ["Antigua and Barbuda"]

// Combine filters: European countries where German is spoken
findCountries({ continent: "Europe", language: "de" }).map((c) => c.iso2);
// ["AT", "BE", "CH", "DE", "LI", "LU"]

// Which countries share +44?
findCountries({ callingCode: 44 }).map((c) => c.iso2);
// ["GB", "GG", "IM", "JE"]

findCountries({ domain: ".uk" }).map((c) => c.name);   // ["United Kingdom"]
findCountries({ timeZone: "Asia/Kolkata" }).map((c) => c.iso2);   // ["IN"]
findCountries({ currency: "XXX" });                    // []
```

Things worth knowing:

- **Calling code `1`** matches the whole North American plan (the US, Canada and the Caribbean nations). Pass the full code, such as `"+1 268"`, to get one country. `47` and `599` work the same way for Svalbard and the Caribbean Netherlands. A bare digit like `4` matches nothing.
- **Continents:** countries that span two continents appear under both, for example Russia under Europe and Asia.
- **Typos are errors, not empty results.** `findCountries({ currncy: "EUR" })` throws `Error: Unknown filter "currncy". Supported: currency, callingCode, domain, timeZone, continent, language`. Non-object filters and wrong value types throw `TypeError`.
- **Time zone aliases** such as `"Asia/Calcutta"` are not resolved; use the current name (`"Asia/Kolkata"`).

### `formatCurrency(amount, country, options?)`

Writes an amount in a country's currency, using that country's number format.

| Parameter | Type | Description |
|---|---|---|
| `amount` | `number` | Any finite number. |
| `country` | `string \| number` | Same input as `getCountry`. |
| `options.locale` | `string` (optional) | Use another number format, such as `"en-US"`. Default: the country's official language and region. |
| `options` (other) | `Intl.NumberFormat` options | For example `currencyDisplay`, `minimumFractionDigits`. `style` and `currency` cannot be changed. |

Throws `TypeError` for `NaN`, `Infinity` and non-numbers, and `Error: Country can not be found for: <input>` for unknown countries.

```ts
import { formatCurrency } from "i18n-iso-countries-extended-info";

formatCurrency(1234.5, "US");        // "$1,234.50"
formatCurrency(1234.5, "DE");        // "1.234,50 €"
formatCurrency(1234567.5, "IN");     // "₹12,34,567.50"
formatCurrency(1234.5, "JP");        // "￥1,235"            (yen has no decimals)
formatCurrency(-5, "GB");            // "-£5.00"

formatCurrency(1234.5, "DE", { locale: "en-US" });             // "€1,234.50"
formatCurrency(1234.5, "US", { currencyDisplay: "code" });     // "USD 1,234.50"
```

Spaces between the number and the symbol are no-break spaces, as in `Intl.NumberFormat`. Arabic-speaking countries use Arabic digits by default; pass `locale: "en"` for Latin digits. Needs full ICU, which is the default in Node.js 13+ and in browsers.

### `getAllCountriesAlphaCodes(type, options?)`

Lists every country's ISO code with its name, ordered by name. Handy for dropdowns.

| Parameter | Type | Description |
|---|---|---|
| `type` | `"Alpha-2" \| "Alpha-3"` | Which code to list. |
| `options.locale` | `string` (optional) | Names in this language. |

```ts
import { getAllCountriesAlphaCodes } from "i18n-iso-countries-extended-info";

getAllCountriesAlphaCodes("Alpha-2").slice(0, 3);
// [
//   { code: "AF", countryName: "Afghanistan" },
//   { code: "AL", countryName: "Albania" },
//   { code: "DZ", countryName: "Algeria" },
// ]

getAllCountriesAlphaCodes("Alpha-3").slice(0, 2);
// [{ code: "AFG", countryName: "Afghanistan" }, { code: "ALB", countryName: "Albania" }]

getAllCountriesAlphaCodes("Alpha-2", { locale: "de" }).slice(0, 3);
// [
//   { code: "AF", countryName: "Afghanistan" },
//   { code: "AL", countryName: "Albanien" },
//   { code: "DZ", countryName: "Algerien" },
// ]
```

### Translated names

`getCountry`, `findCountries` and `getAllCountriesAlphaCodes` accept `{ locale }`. It translates the country name, the currency name and the official language name. Everything else stays the same.

```ts
const germany = getCountry("DE", { locale: "fr" });
germany.name;               // "Allemagne"
germany.currencyName;       // "euro"
germany.language.official;  // "allemand"

getCountry("US", { locale: "ja" }).name;   // "アメリカ合衆国"
getCountry("BR", { locale: "es" }).name;   // "Brasil"
findCountries({ callingCode: 49 }, { locale: "fr" })[0].name;   // "Allemagne"
```

- Without `locale` you get the English names.
- A valid locale your runtime has no translations for (for example `"xx"`) falls back to English.
- A malformed locale throws: `RangeError: Invalid locale: "en_US"` (use `"en-US"`, with a dash). A non-string throws `TypeError`.
- Names come from the runtime's `Intl` data, so they add nothing to your bundle.
- Looking a country up *by* a translated name is not supported; `input` is always an English name.

### `COUNTRY_CODES` and `CountryCode`

```ts
import { COUNTRY_CODES, type CountryCode } from "i18n-iso-countries-extended-info";

COUNTRY_CODES.length;      // 250
COUNTRY_CODES.slice(0, 4); // ["AD", "AE", "AF", "AG"]

const code: CountryCode = "DE";   // OK
const bad: CountryCode = "XX";    // TypeScript error: not a country code
```

### The `Country` record

| Field | Type | Example (Germany) | Notes |
|---|---|---|---|
| `iso2` | `string` | `"DE"` | |
| `iso3` | `string` | `"DEU"` | |
| `numeric` | `string` | `"276"` | ISO 3166-1 numeric code, zero-padded (`"036"` for Australia). |
| `name` | `string` | `"Germany"` | |
| `native` | `string` | `"Deutschland"` | Name in the local language. |
| `capital` | `string` | `"Berlin"` | `""` for territories without one. |
| `flag` | `string` | `"🇩🇪"` | Emoji flag. |
| `isdCodes` | `number[]` | `[49]` | Calling codes. |
| `language` | `{ code, official, others }` | `{ code: "de", official: "German", others: ["de"] }` | `official` is `""` when unknown. |
| `continent` | `"AF" \| "AN" \| "AS" \| "EU" \| "NA" \| "OC" \| "SA"` | `"EU"` | |
| `continents` | `string[]` (optional) | `["AS", "EU"]` for Russia | Only for countries spanning continents. |
| `region` | `string` | `"Europe"` | |
| `currency` | `string` | `"EUR"` | ISO 4217 code. |
| `currencyName` | `string` | `"Euro"` | `""` when unknown. |
| `symbol` | `string` | `"€"` | |
| `timeZones` | `{ name, utcOffset, utcOffsetStr, dstOffset, dstOffsetStr }[]` | `name: "Europe/Berlin"`, `utcOffsetStr: "+01:00"` | Offsets are in minutes; `dst…` is the offset while daylight saving applies. |
| `domain` | `string` | `".de"` | |
| `domainUnofficial` | `boolean` (optional) | `true` for Bouvet Island | Set for the few territories (BV, EH, SJ, UM, XK) with no TLD in actual use. |
| `dateFormat` | `string` (optional) | `"dd.MM.yyyy"` | Missing for many countries. |

## Recipes

**Country dropdown in the user's language**

```ts
const options = getAllCountriesAlphaCodes("Alpha-2", { locale: navigator.language });
// <option value={code}>{countryName}</option>
```

**Which country uses this calling code?**

```ts
findCountries({ callingCode: "+49" }).map((c) => c.name);   // ["Germany"]
```

**Local time in a country**

```ts
const { timeZones } = getCountry("IN");
new Date().toLocaleTimeString("en-GB", { timeZone: timeZones[0].name });   // e.g. "19:42:07"
```

For countries with several zones (the US has 29 in the data), pick the one you need from `timeZones`.

**Check that user input is a real country code**

```ts
const isCountryCode = (value: string): value is CountryCode =>
  (COUNTRY_CODES as readonly string[]).includes(value);
```

## TypeScript

Types ship with the package; there is nothing extra to install. Exported types: `Country`, `CountryCode`, `CountryFilter`, `LocaleOptions`, `FormatCurrencyOptions`, `CountryInfo`, `LocationInfo`, `CurrencyInfo`, `CountryDetailInformation`, `AlphaCode`, `CountryIsoCodePreview` and `ContinentCode`.

## Good to know

- **Requirements:** Node.js 20 or newer. Works in bundlers and browsers; ESM and CommonJS builds are both included.
- **Size:** the country data is about 200 KB (unminified) and is loaded with the package. To use the raw data alone, import it from `i18n-iso-countries-extended-info/data`.
- **Data quirks:** some fields are empty strings where a country has no value (for example Antarctica has no capital). `dateFormat` is missing for most countries.
- **No setup:** the package registers the English country names it needs by itself.

## Migrating from 1.x

Version 2 replaces the 17 `getCountry…By…` functions with `getCountry`. See the **[migration guide](docs/migration-v2.md)** for a function-by-function table.

## Development

```bash
npm install
npm run verify      # lint, type-check and tests
npm run build       # ESM + CJS + types in dist/
npm run test:pack   # install the packed tarball into a clean project and call it
```

Releases are produced with `npm run release`. See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)
