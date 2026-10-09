# i18n-iso-countries-extended-info


## Introduction

**i18n-iso-countries-extended-info** gives you one call to get the facts about a country: ISO codes, names, capital, languages, continent, currency, time zones and internet domain. Everything is bundled, so there are no network calls and no setup. Install it and call it; you do not need to install or configure `i18n-iso-countries` yourself.

```ts
import { findCountries, formatCurrency, getCountry } from "i18n-iso-countries-extended-info";

getCountry("DE");                 // by ISO-2, ISO-3, numeric code or English name
findCountries({ currency: "EUR" }); // reverse lookup
formatCurrency(1234.5, "DE");     // "1.234,50 €"
```

| Function | Purpose |
|---|---|
| `getCountry(input)` | Full record for one country |
| `findCountries(filter)` | Countries by currency, calling code, domain, time zone, continent or language |
| `formatCurrency(amount, country, options?)` | Amount formatted in a country's currency |
| `getAllCountriesAlphaCodes(type)` | Every ISO-2 or ISO-3 code with its English name |

Also exported: `COUNTRY_CODES` and the `CountryCode` type (all ISO-2 codes), plus the result types. ESM and CommonJS are both supported; `i18n-iso-countries-extended-info/data` exposes the raw dataset on its own.

## Migrating from 1.x

The 16 `getCountry<View>By<Key>` functions and `getCountryAlphaCodeByName` were removed. `getCountry` accepts every key type and returns every view.

| 1.x | 2.0 |
|---|---|
| `getCountryDetailInformationByAlpha2Code("DE")` (also `…Alpha3Code`, `…Name`, `…NumericCode`) | `getCountry("DE")` |
| `getCountryGeneralInformationBy…("DE")` | `const { name, native, capital, flag, isdCodes, language } = getCountry("DE")` |
| `getCountryLocationInformationBy…("DE")` | `const { continent, region, continents } = getCountry("DE")` |
| `getCountryCurrencyInformationBy…("DE")` | `const { currency, currencyName, symbol } = getCountry("DE")` |
| `getCountryAlphaCodeByName("Germany", "both")` | `const { iso2, iso3 } = getCountry("Germany")` |

Behaviour differences: `getCountry` is not strict about the key type (an ISO-2 lookup used to reject a name), every failure throws `Country can not be found for: <input>`, and results are copies you can safely modify.

## API Usage

The following is auto-generated from `./src/countryIsoInformationService.ts`:

### getCountry · function

Retrieves the complete country record (codes, names, capital, languages, continent,
currency, time zones, domain) from an ISO-2 code, ISO-3 code, numeric code or English country name.

**Signature:** `(input: number | CountryCodeInput) => Country`

**Parameters:**

- `input` - - ISO-2/ISO-3/numeric code or English name, e.g. "DE", "DEU", 276, "Germany".

**Returns:** The full country record.

**Throws:**

- Will throw an error if no country matches the input.

**Examples:**

```ts
const germany = getCountry("DEU");
const sameGermany = getCountry("germany");
const { capital, currency, timeZones } = getCountry(276);
```

### findCountries · function

Finds every country matching all given criteria (reverse lookup).
Matching is case-insensitive and ignores surrounding whitespace. Results are ordered by ISO-2 code;
no match returns an empty array, and an empty filter returns every country.

**Signature:** `(filter: CountryFilter) => Country[]`

**Parameters:**

- `filter` - - Any of `currency`, `callingCode`, `domain`, `timeZone`, `continent`, `language`.

**Returns:** The matching country records.

**Throws:**

- Will throw an error if the filter is not an object, has an unknown key, or a value of the wrong type.

**Examples:**

```ts
findCountries({ currency: "EUR" });                    // 37 countries
findCountries({ callingCode: "+1 268" });              // Antigua and Barbuda
findCountries({ continent: "Europe", language: "de" });
findCountries({ domain: ".de" });
```

### formatCurrency · function

Formats an amount in the currency of a country, using the country's official language and region
for the number format (e.g. 1234.5 in Germany is "1.234,50 €").

**Signature:** `(amount: number, country: number | CountryCodeInput, options?: FormatCurrencyOptions) => string`

**Parameters:**

- `amount` - - A finite number.
- `country` - - ISO-2/ISO-3/numeric code or English name, e.g. "DE", "DEU", 276, "Germany".
- `options` - - `locale` overrides the number format; other `Intl.NumberFormat` options pass through (except `style` and `currency`).

**Returns:** The formatted amount.

**Throws:**

- Will throw an error if the amount is not a finite number or the country is not found.

**Examples:**

```ts
formatCurrency(1234.5, "US");                       // "$1,234.50"
formatCurrency(1234.5, "DE");                       // "1.234,50 €"
formatCurrency(1234.5, "DE", { locale: "en-US" });  // "€1,234.50"
```

### getAllCountriesAlphaCodes · function

Lists every country's ISO code together with its English name.

**Signature:** `(alphaCodeType: AlphaCode) => CountryIsoCodePreview[]`

**Parameters:**

- `alphaCodeType` - - "Alpha-2" or "Alpha-3".

**Returns:** An array of `{ code, countryName }`.

**Examples:**

```ts
getAllCountriesAlphaCodes("Alpha-2"); // [{ code: "AD", countryName: "Andorra" }, ...]
```

## License

MIT License
