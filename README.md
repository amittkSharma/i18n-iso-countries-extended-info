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
```

## License

MIT License
