# i18n-iso-countries-extended-info


## Introduction

**i18n-iso-countries-extended-info** package provides some of the basic and important information about the countries in the world.
The information provided is completely in a standardized format.

**Features**

- Get ISO codes (both ISO-2 and ISO-3) for all the country around the world
- Get information about the countries from their respective ISO and numeric codes
- Information provided
  - ISO-2/ISO-3 Codes
  - Numeric Codes
  - Country Name
- Validation of ISO-2/ISO-3 code for the countries


## API Usage

The following is auto-generated from `./src/countryIsoInformationService.ts`:

### __export · value

**Value:** `any`

### getAllCountriesAlphaCodes · function

This function retrieves all countries' ISO codes based on the specified alpha code type.

**Signature:** `(alphaCodeType: "Alpha-2" | "Alpha-3") => CountryIsoCodePreview[]`

**Parameters:**

- `alphaCodeType` - - The type of alpha code ("Alpha-2" or "Alpha-3") to filter the countries by.

**Returns:** An array of country ISO code previews corresponding to the specified alpha code type.

**Throws:**

- Will throw an error if the provided alpha code type is invalid.

**Examples:**

```ts
const alpha2Codes = getAllCountriesAlphaCodes("Alpha-2");
const alpha3Codes = getAllCountriesAlphaCodes("Alpha-3");
```

### getCountryAlphaCodeByName · function

This function retrieves the ISO code(s) for a given country name based on the specified alpha code type.

**Signature:** `(countryName: string, alphaCode?: "Alpha-2" | "Alpha-3" | "both") => string`

**Parameters:**

- `countryName` - - The name of the country to retrieve the ISO code(s) for.
- `alphaCode` - - The type of alpha code to retrieve ("Alpha-2", "Alpha-3", or "both"). Default is "Alpha-2".

**Returns:** The ISO code(s) corresponding to the specified country name and alpha code type.

**Throws:**

- Will throw an error if the country name is not found or if the alpha code type is invalid.

**Examples:**

```ts
const alpha2Code = getCountryAlphaCodeByName("United States", "Alpha-2");
const alpha3Code = getCountryAlphaCodeByName("United States", "Alpha-3");
const bothCodes = getCountryAlphaCodeByName("United States", "both");
```

### getCountryCurrencyInformationByAlpha2Code · function

The following functions retrieve various types of country information
based on Alpha-2 code identifiers.

**Signature:** `(alpha2Code: string) => CurrencyInfo`

**Parameters:**

- `alpha2Code` - - The Alpha-2 code of the country.

**Returns:** Currency information of the country.

**Throws:**

- Will throw an error if the Alpha-2 code is not found.

**Examples:**

```ts
const currencyInfo = getCountryCurrencyInformationByAlpha2Code("US");
result: {
   "currency": "USD",
   "symbol": "$",
   "currencyName": "United States dollar"
 }
```

### getCountryDetailInformationByAlpha2Code · function

* The following functions retrieve various types of country information
based on Alpha-2 code identifiers.

**Signature:** `(alpha2Code: string) => CountryDetailInformation`

**Parameters:**

- `alpha2Code` - - The Alpha-2 code of the country.

**Returns:** Detailed information of the country.

**Throws:**

- Will throw an error if the Alpha-2 code is not found.

**Examples:**

```ts
const detailInfo = getCountryDetailInformationByAlpha2Code("US");
result:{
 "name": "United States",
 "native": "United States",
 "capital": "Washington D.C.",
 "flag": "🇺🇸",
 "isdCodes": [
     1
 ],
 "language": {
     "code": "en",
     "official": "English",
     "others": [
       "en"
     ]
 },
 "continent": "NA",
 "region": "North America",
 "currency": "USD",
 "symbol": "$",
 "currencyName": "United States dollar"
}
```

### getCountryGeneralInformationByAlpha2Code · function

* The following functions retrieve various types of country information
based on Alpha-2 code identifiers.

**Signature:** `(alpha2Code: string) => CountryInfo`

**Parameters:**

- `alpha2Code` - - The Alpha-2 code of the country.

**Returns:** General information of the country.

**Throws:**

- Will throw an error if the Alpha-2 code is not found.

**Examples:**

```ts
const generalInfo = getCountryGeneralInformationByAlpha2Code("US");
result: {
   "name": "United States",
   "native": "United States",
   "capital": "Washington D.C.",
   "flag": "🇺🇸",
   "isdCodes": [
       1
   ],
   "language": {
       "code": "en",
       "official": "English",
       "others": [
         "en"
       ]
   }
 }
```

### getCountryLocationInformationByAlpha2Code · function

* The following functions retrieve various types of country information
based on Alpha-2 code identifiers.

**Signature:** `(alpha2Code: string) => LocationInfo`

**Parameters:**

- `alpha2Code` - - The Alpha-2 code of the country.

**Returns:** Location information of the country.

**Throws:**

- Will throw an error if the Alpha-2 code is not found.

**Examples:**

```ts
const locationInfo = getCountryLocationInformationByAlpha2Code("US");
result: {
 "continent": "NA",
 "region": "North America"
}
```

### getCountryCurrencyInformationByAlpha3Code · function

* The following functions retrieve various types of country information
based on Alpha-3 code identifiers.

**Signature:** `(alpha3Code: string) => CurrencyInfo`

**Parameters:**

- `alpha3Code` - - The Alpha-3 code of the country.

**Returns:** Currency information of the country.

**Throws:**

- Will throw an error if the Alpha-3 code is not found.

**Examples:**

```ts
const currencyInfo = getCountryCurrencyInformationByAlpha3Code("USA");
result: {
   "currency": "USD",
   "symbol": "$",
   "currencyName": "United States dollar"
 }
```

### getCountryDetailInformationByAlpha3Code · function

* The following functions retrieve various types of country information
based on Alpha-3 code identifiers.

**Signature:** `(alpha3Code: string) => CountryDetailInformation`

**Parameters:**

- `alpha3Code` - - The Alpha-3 code of the country.

**Returns:** Detailed information of the country.

**Throws:**

- Will throw an error if the Alpha-3 code is not found.

**Examples:**

```ts
const detailInfo = getCountryDetailInformationByAlpha3Code("USA");
result:{
 "name": "United States",
 "native": "United States",
 "capital": "Washington D.C.",
 "flag": "🇺🇸",
 "isdCodes": [
     1
 ],
 "language": {
     "code": "en",
     "official": "English",
     "others": [
       "en"
     ]
 },
 "continent": "NA",
 "region": "North America",
 "currency": "USD",
 "symbol": "$",
 "currencyName": "United States dollar"
}
```

### getCountryGeneralInformationByAlpha3Code · function

* The following functions retrieve various types of country information
based on Alpha-3 code identifiers.

**Signature:** `(alpha3Code: string) => CountryInfo`

**Parameters:**

- `alpha3Code` - - The Alpha-3 code of the country.

**Returns:** General information of the country.

**Throws:**

- Will throw an error if the Alpha-3 code is not found.

**Examples:**

```ts
const generalInfo = getCountryGeneralInformationByAlpha3Code("USA");
result: {
   "name": "United States",
   "native": "United States",
   "capital": "Washington D.C.",
   "flag": "🇺🇸",
   "isdCodes": [
       1
   ],
   "language": {
       "code": "en",
       "official": "English",
       "others": [
         "en"
       ]
   }
 }
```

### getCountryLocationInformationByAlpha3Code · function

* The following functions retrieve various types of country information
based on Alpha-3 code identifiers.

**Signature:** `(alpha3Code: string) => LocationInfo`

**Parameters:**

- `alpha3Code` - - The Alpha-3 code of the country.

**Returns:** Location information of the country.

**Throws:**

- Will throw an error if the Alpha-3 code is not found.

**Examples:**

```ts
const locationInfo = getCountryLocationInformationByAlpha3Code("USA");
result: {
 "continent": "NA",
 "region": "North America"
}
```

### getCountryCurrencyInformationByName · function

* The following functions retrieve various types of country information
based on country names.

**Signature:** `(name: string) => CurrencyInfo`

**Parameters:**

- `name` - - The name of the country.

**Returns:** Currency information of the country.

**Throws:**

- Will throw an error if the country name is not found.

**Examples:**

```ts
const currencyInfo = getCountryCurrencyInformationByName("United States");
result: {
   "currency": "USD",
   "symbol": "$",
   "currencyName": "United States dollar"
 }
```

### getCountryDetailInformationByName · function

* The following functions retrieve various types of country information
based on country names.

**Signature:** `(name: string) => CountryDetailInformation`

**Parameters:**

- `name` - - The name of the country.

**Returns:** Detailed information of the country.

**Throws:**

- Will throw an error if the country name is not found.

**Examples:**

```ts
const detailInfo = getCountryDetailInformationByName("United States");
result:{
 "name": "United States",
 "native": "United States",
 "capital": "Washington D.C.",
 "flag": "🇺🇸",
 "isdCodes": [
     1
 ],
 "language": {
     "code": "en",
     "official": "English",
     "others": [
       "en"
     ]
 },
 "continent": "NA",
 "region": "North America",
 "currency": "USD",
 "symbol": "$",
 "currencyName": "United States dollar"
}
```

### getCountryGeneralInformationByName · function

* The following functions retrieve various types of country information
based on country names.

**Signature:** `(name: string) => CountryInfo`

**Parameters:**

- `name` - - The name of the country.

**Returns:** General information of the country.

**Throws:**

- Will throw an error if the country name is not found.

**Examples:**

```ts
const generalInfo = getCountryGeneralInformationByName("United States");
result: {
   "name": "United States",
   "native": "United States",
   "capital": "Washington D.C.",
   "flag": "🇺🇸",
   "isdCodes": [
       1
   ],
   "language": {
       "code": "en",
       "official": "English",
       "others": [
         "en"
       ]
   }
 }
```

### getCountryLocationInformationByName · function

* The following functions retrieve various types of country information
based on country names.

**Signature:** `(name: string) => LocationInfo`

**Parameters:**

- `name` - - The name of the country.

**Returns:** Location information of the country.

**Throws:**

- Will throw an error if the country name is not found.

**Examples:**

```ts
const locationInfo = getCountryLocationInformationByName("United States");
result: {
 "continent": "NA",
 "region": "North America"
}
```

### getCountryCurrencyInformationByNumericCode · function

* The following functions retrieve various types of country information
based on Numeric code identifiers.

**Signature:** `(numericCode: string) => CurrencyInfo`

**Parameters:**

- `numericCode` - - The Numeric code of the country.

**Returns:** Currency information of the country.

**Throws:**

- Will throw an error if the Numeric code is not found.

**Examples:**

```ts
const currencyInfo = getCountryCurrencyInformationByNumericCode("840");
result: {
   "currency": "USD",
   "symbol": "$",
   "currencyName": "United States dollar"
 }
```

### getCountryDetailInformationByNumericCode · function

* The following functions retrieve various types of country information
based on Numeric code identifiers.

**Signature:** `(numericCode: string) => CountryDetailInformation`

**Parameters:**

- `numericCode` - - The Numeric code of the country.

**Returns:** Detailed information of the country.

**Throws:**

- Will throw an error if the Numeric code is not found.

**Examples:**

```ts
const detailInfo = getCountryDetailInformationByNumericCode("840");
result:{
 "name": "United States",
 "native": "United States",
 "capital": "Washington D.C.",
 "flag": "🇺🇸",
 "isdCodes": [
     1
 ],
 "language": {
     "code": "en",
     "official": "English",
     "others": [
       "en"
     ]
 },
 "continent": "NA",
 "region": "North America",
 "currency": "USD",
 "symbol": "$",
 "currencyName": "United States dollar"
}
```

### getCountryGeneralInformationByNumericCode · function

* The following functions retrieve various types of country information
based on Numeric code identifiers.

**Signature:** `(numericCode: string) => CountryInfo`

**Parameters:**

- `numericCode` - - The Numeric code of the country.

**Returns:** General information of the country.

**Throws:**

- Will throw an error if the Numeric code is not found.

**Examples:**

```ts
const generalInfo = getCountryGeneralInformationByNumericCode("840");
result: {
   "name": "United States",
   "native": "United States",
   "capital": "Washington D.C.",
   "flag": "🇺🇸",
   "isdCodes": [
       1
   ],
   "language": {
       "code": "en",
       "official": "English",
       "others": [
         "en"
       ]
   }
 }
```

### getCountryLocationInformationByNumericCode · function

* The following functions retrieve various types of country information
based on Numeric code identifiers.

**Signature:** `(numericCode: string) => LocationInfo`

**Parameters:**

- `numericCode` - - The Numeric code of the country.

**Returns:** Location information of the country.

**Throws:**

- Will throw an error if the Numeric code is not found.

**Examples:**

```ts
const locationInfo = getCountryLocationInformationByNumericCode("840");
result: {
 "continent": "NA",
 "region": "North America"
}
```

### getCountry · function

Retrieves the complete country record (codes, general, location, currency, time zones, domain)
from an ISO-2 code, ISO-3 code, numeric code or English country name.

**Signature:** `(input: string | number) => Country`

**Parameters:**

- `input` - - ISO-2/ISO-3/numeric code or English name, e.g. "DE", "DEU", 276, "Germany".

**Returns:** The full country record.

**Throws:**

- Will throw an error if no country matches the input.

**Examples:**

```ts
const germany = getCountry("DEU");
const sameGermany = getCountry("germany");
```

## License

MIT License
