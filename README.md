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

###### getAllCountriesIsoCodes

- **getAllCountriesIsoCodes** will provide array of iso code and country name. The ISO code can be either ISO-2 or ISO-3 format
- The API parameter supports two values: "iso-2" | "iso-3"
- Default: ISO-2 codes will be provided
- Total 250 countries ISO codes will be provided


```api usage
const iso2Codes = getAllCountriesIsoCodes()

or

const iso2Codes = getAllCountriesIsoCodes("iso-2")

Result Set:
[
  {
      "code": "AE",
      "countryName": "United Arab Emirates"
   },
   {
      "code": "GB",
      "countryName": "United Kingdom"
   },
   {
      "code": "US",
      "countryName": "United States of America"
   },
]

----

For ISO-3 codes

const iso3Codes = getAllCountriesIsoCodes("iso-3")

Result Set:

[
  {
      "code": "ARE",
      "countryName": "United Arab Emirates"
   },
   {
      "code": "GBR",
      "countryName": "United Kingdom"
   },
   {
      "code": "USA",
      "countryName": "United States of America"
   },
]

```

###### getCountryInformationByName

- **getCountryInformationByName** will provide basic information about the country by name. The information provided will be in accordance to ISO standards
- Following information will be provided
      - Country Name
      - ISO-2 code
      - ISO-3 code
      - Numeric code
      - Currency Information like currency type, symbol

```api usage
const countryInfo = getCountryInformationByName("United States")

Result:
 {
   "countryName": "United States",
   "iso2Code": "US",
   "iso3Code": "USA",
   "currency": "USD",
   "symbol": "$",
   "dateFormat": "M/d/yyyy",
   "numericCode": 840
}

```

###### getCountryInformationByIso2Code
- **getCountryInformationByIso2Code** will provide basic information about the country by ISO-2 code. The information provided will be in accordance to ISO standards
- Following information will be provided
      - Country Name
      - ISO-2 code
      - ISO-3 code
      - Numeric code
      - Currency Information like currency type, symbol
- The API will check the length of the ISO code provided, the length of ISO-2 code must always be equal to 2
- The API will throw an error, in case of in-valid ISO-2 country code

```api usage

const countryInfo = getCountryInformationByIso2Code("US")

Result Set:

 {
   "countryName": "United States",
   "iso2Code": "US",
   "iso3Code": "USA",
   "currency": "USD",
   "symbol": "$",
   "dateFormat": "M/d/yyyy",
   "numericCode": 840
}

----

When ISO-2 code provided is not of appropriate length, error will be thrown

const countryInfo = getCountryInformationByIso2Code("US")

Error: Iso-code length is not appropriate, ISO-2 code must have length of 2 characters

----

When ISO-2 code provided is not appropriate, error will be thrown

const countryInfo = getCountryInformationByIso2Code("AA")

Error: Iso Code/Numeric Code: AA is not valid
```

###### getCountryInformationByIso3Code
- **getCountryInformationByIso3Code** will provide basic information about the country by ISO-3 code. The information provided will be in accordance to ISO standards
- Following information will be provided
      - Country Name
      - ISO-2 code
      - ISO-3 code
      - Numeric code
      - Currency Information like currency type, symbol
- The API will check the length of the ISO code provided, the length of ISO-2 code must always be equal to 3
- The API will throw an error, in case of in-valid ISO-3 country code

```api usage

const countryInfo = getCountryInformationByIso3Code("USA")

Result Set:

 {
   "countryName": "United States",
   "iso2Code": "US",
   "iso3Code": "USA",
   "currency": "USD",
   "symbol": "$",
   "dateFormat": "M/d/yyyy",
   "numericCode": 840
}

----

When ISO-3 code provided is not of appropriate length, error will be thrown

const countryInfo = getCountryInformationByIso3Code("US")

Error: Iso-code length is not appropriate, ISO-3 code must have length of 3 characters

----

When ISO-3 code provided is not appropriate, error will be thrown

const countryInfo = getCountryInformationByIso3Code("AAA")

Error: Iso Code/Numeric Code: AAA is not valid
```
###### getCountryInformationByNumericCode
- **getCountryInformationByNumericCode** will provide basic information about the country by numeric code. The information provided will be in accordance to ISO standards
- Following information will be provided
      - Country Name
      - ISO-2 code
      - ISO-3 code
      - Numeric code
      - Currency Information like currency type, symbol
- The API will throw an error, in case of in-valid numeric country code

```api usage

const countryInfo = getCountryInformationByNumericCode("840")

Result Set:

 {
   "countryName": "United States",
   "iso2Code": "US",
   "iso3Code": "USA",
   "currency": "USD",
   "symbol": "$",
   "dateFormat": "M/d/yyyy",
   "numericCode": 840
}

----

When numeric code provided is not appropriate, error will be thrown

const countryInfo = getCountryInformationByNumericCode("80")

Error: Iso Code/Numeric Code: 80 is not valid
```
###### isCountryIsoOrNumericCodeValid

- **isCountryIsoOrNumericCodeValid** is the API that validates the ISO-codes or numeric code for a given country
- Returns the "true" value for the valid code or throws error for an invalid code

``` api usage

const isCountryCodeValid = isCountryIsoOrNumericCodeValid("USA");

OR

const isCountryCodeValid = isCountryIsoOrNumericCodeValid("US");

OR

const isCountryCodeValid = isCountryIsoOrNumericCodeValid("840");

Returns "true" value as the ISO-codes and numeric code is valid for "USA"

----

When ISO/Numeric code provided is not appropriate, error will be thrown


const isCountryCodeValid = isCountryIsoOrNumericCodeValid("inValidCode");

Error: Iso Code/Numeric Code: inValidCode is not valid

```



## License

MIT License
