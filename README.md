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

- "getAllCountriesIsoCodes" will provide array of iso code and country name. The ISO code can be either ISO-2 or ISO-3 format
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
###### getCountryInformationByIso3Code
###### getCountryInformationByNumericCode
###### isCountryIsoOrNumericCodeValid

## License

MIT License
