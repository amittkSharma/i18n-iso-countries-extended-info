# Migrating from 1.x to 2.x

Version 2 replaces 17 narrow functions with one that does the same job: `getCountry`. Every view the old functions returned is a field of the new record, so most migrations are a one-line search and replace.

Prefer to wait? Stay on the last 1.x release with `npm install i18n-iso-countries-extended-info@1`.

## 1. Replace the removed functions

Each removed function existed in four flavours, one per lookup key: `…ByAlpha2Code`, `…ByAlpha3Code`, `…ByName` and `…ByNumericCode`. `getCountry` accepts all four keys, so the key part simply disappears.

| 1.x function (any key flavour) | 2.x replacement |
|---|---|
| `getCountryDetailInformationBy…(key)` | `getCountry(key)` |
| `getCountryGeneralInformationBy…(key)` | `const { name, native, capital, flag, isdCodes, language } = getCountry(key)` |
| `getCountryLocationInformationBy…(key)` | `const { continent, region, continents } = getCountry(key)` |
| `getCountryCurrencyInformationBy…(key)` | `const { currency, currencyName, symbol } = getCountry(key)` |
| `getCountryAlphaCodeByName(name, "Alpha-2")` | `getCountry(name).iso2` |
| `getCountryAlphaCodeByName(name, "Alpha-3")` | `getCountry(name).iso3` |
| `getCountryAlphaCodeByName(name, "both")` | `const { iso2, iso3 } = getCountry(name)` |
| `getAllCountriesAlphaCodes(type)` | unchanged |

## 2. Before and after

```ts
// 1.x
import {
  getCountryDetailInformationByAlpha2Code,
  getCountryCurrencyInformationByName,
  getCountryAlphaCodeByName,
} from "i18n-iso-countries-extended-info";

const germany = getCountryDetailInformationByAlpha2Code("DE");
const { currency } = getCountryCurrencyInformationByName("Germany");
const codes = getCountryAlphaCodeByName("Germany", "both"); // "DE, DEU"
```

```ts
// 2.x
import { getCountry } from "i18n-iso-countries-extended-info";

const germany = getCountry("DE");
const { currency } = getCountry("Germany");
const { iso2, iso3 } = getCountry("Germany"); // "DE", "DEU"
```

## 3. Behaviour differences

| | 1.x | 2.x |
|---|---|---|
| Key type | Each function accepted one kind of key and rejected the others (an ISO-2 function refused `"Germany"`). | `getCountry` accepts an ISO-2, ISO-3 or numeric code (string or number) or an English name, in any case. |
| Errors | Several messages, for example `Iso-code length is not appropriate, ISO-2 code must have length of 2 characters` or `Iso Code/Numeric Code: XX is not valid`. | One message: `Country can not be found for: <input>`. If your code matches on the old texts, update it. |
| Results | Arrays inside results were the package's shared dataset arrays, so changing one could corrupt later calls. | Every call returns a fresh copy you can safely modify. |
| Country names | A few names from the data (for example `Brunei`, `Laos`, `Moldova`) were not accepted as input. | `getCountry(getCountry(x).name)` always works. |
| Time zones, domain | The "detail" functions did not return them, although the README advertised them. | Always present. |

## 4. Data changes

- **Great Britain's domain** is now `.uk`, the TLD in actual use (it was `.gb`).
- **`domain`** is a plain TLD. The `" (unofficial)"` suffix that five territories carried is gone; those territories (BV, EH, SJ, UM, XK) have `domainUnofficial: true` instead.
- **New fields:** `iso2`, `iso3`, `numeric` (ISO 3166-1 numeric code as a string such as `"036"`), `timeZones`, `domain` and `dateFormat` on the main record.

## 5. Type changes

- Fields that exist for every country are now required (`name`, `capital`, `currency`, `timeZones` and so on). Code that guarded against `undefined` keeps working; code that assigned partial objects of these types may need updating. Only `dateFormat`, `continents` and `domainUnofficial` are optional.
- Unknown values are empty strings, not `undefined` (for example `capital` is `""` for Antarctica).
- The types `CountryInfo`, `LocationInfo`, `CurrencyInfo`, `CountryDetailInformation`, `AlphaCode` and `CountryIsoCodePreview` are still exported. New: `Country`, `CountryCode`, `CountryFilter`, `LocaleOptions`, `FormatCurrencyOptions` and the `COUNTRY_CODES` constant.

## 6. Environment

- Node.js 20 or newer (`engines` is set). Both ESM (`import`) and CommonJS (`require`) are supported.
- You still do not need to install or configure `i18n-iso-countries`.

## Checklist

1. Search your code for `getCountry…By` and `getCountryAlphaCodeByName`.
2. Replace each call using the table above.
3. Run your type checker; it flags every spot that needs an update.
4. If you matched on old error messages, switch to `Country can not be found for:`.
