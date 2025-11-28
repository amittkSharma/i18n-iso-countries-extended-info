export * from "./types";
/**
 * This function retrieves all countries' ISO codes based on the specified alpha code type.
 * @param alphaCodeType - The type of alpha code ("Alpha-2" or "Alpha-3") to filter the countries by.
 * @returns An array of country ISO code previews corresponding to the specified alpha code type.
 * @example
 * ```ts
 * const alpha2Codes = getAllCountriesAlphaCodes("Alpha-2");
 * const alpha3Codes = getAllCountriesAlphaCodes("Alpha-3");
 * ```
 * @returns An array of country ISO code previews.
 * @defaults "Alpha-2"
 * @throws Will throw an error if the provided alpha code type is invalid.
 */
export declare const getAllCountriesAlphaCodes: (alphaCodeType: "Alpha-2" | "Alpha-3") => import("./types").CountryIsoCodePreview[];
/**
 * This function retrieves the ISO code(s) for a given country name based on the specified alpha code type.
 * @param countryName - The name of the country to retrieve the ISO code(s) for.
 * @param alphaCode - The type of alpha code to retrieve ("Alpha-2", "Alpha-3", or "both"). Default is "Alpha-2".
 * @returns The ISO code(s) corresponding to the specified country name and alpha code type.
 * @example
 * ```ts
 * const alpha2Code = getCountryAlphaCodeByName("United States", "Alpha-2");
 * const alpha3Code = getCountryAlphaCodeByName("United States", "Alpha-3");
 * const bothCodes = getCountryAlphaCodeByName("United States", "both");
 * ```
 * @returns The ISO code(s) for the specified country name.
 * @defaults "Alpha-2"
 * @throws Will throw an error if the country name is not found or if the alpha code type is invalid.
 */
export declare const getCountryAlphaCodeByName: (countryName: string, alphaCode?: "Alpha-2" | "Alpha-3" | "both") => string | undefined;
/**
 * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByAlpha2Code("US");
 * result: {
      "currency": "USD",
      "symbol": "$",
      "currencyName": "United States dollar"
    }
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export declare const getCountryCurrencyInformationByAlpha2Code: (alpha2Code: string) => import("./types").CurrencyInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByAlpha2Code("US");
 * result:{
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
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export declare const getCountryDetailInformationByAlpha2Code: (alpha2Code: string) => import("./types").CountryDetailInformation | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByAlpha2Code("US");
 * result: {
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
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 *
 */
export declare const getCountryGeneralInformationByAlpha2Code: (alpha2Code: string) => import("./types").CountryInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByAlpha2Code("US");
 * result: {
    "continent": "NA",
    "region": "North America"
   }
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export declare const getCountryLocationInformationByAlpha2Code: (alpha2Code: string) => import("./types").LocationInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByAlpha3Code("USA");
 * result: {
      "currency": "USD",
      "symbol": "$",
      "currencyName": "United States dollar"
    }
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export declare const getCountryCurrencyInformationByAlpha3Code: (alpha3Code: string) => import("./types").CurrencyInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByAlpha3Code("USA");
 * result:{
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
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export declare const getCountryDetailInformationByAlpha3Code: (alpha3Code: string) => import("./types").CountryDetailInformation | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByAlpha3Code("USA");
 * result: {
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
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export declare const getCountryGeneralInformationByAlpha3Code: (alpha3Code: string) => import("./types").CountryInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByAlpha3Code("USA");
 * result: {
    "continent": "NA",
    "region": "North America"
   }
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 *
 */
export declare const getCountryLocationInformationByAlpha3Code: (alpha3Code: string) => import("./types").LocationInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByName("United States");
 * result: {
      "currency": "USD",
      "symbol": "$",
      "currencyName": "United States dollar"
    }
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export declare const getCountryCurrencyInformationByName: (name: string) => import("./types").CurrencyInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByName("United States");
 * result:{
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
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export declare const getCountryDetailInformationByName: (name: string) => import("./types").CountryDetailInformation | undefined;
/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByName("United States");
 * result: {
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
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export declare const getCountryGeneralInformationByName: (name: string) => import("./types").CountryInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByName("United States");
 * result: {
    "continent": "NA",
    "region": "North America"
   }
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export declare const getCountryLocationInformationByName: (name: string) => import("./types").LocationInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByNumericCode("840");
 * result: {
      "currency": "USD",
      "symbol": "$",
      "currencyName": "United States dollar"
    }
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export declare const getCountryCurrencyInformationByNumericCode: (numericCode: string) => import("./types").CurrencyInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByNumericCode("840");
 * result:{
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
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export declare const getCountryDetailInformationByNumericCode: (numericCode: string) => import("./types").CountryDetailInformation | undefined;
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByNumericCode("840");
 * result: {
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
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export declare const getCountryGeneralInformationByNumericCode: (numericCode: string) => import("./types").CountryInfo | undefined;
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByNumericCode("840");
 * result: {
    "continent": "NA",
    "region": "North America"
   }
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export declare const getCountryLocationInformationByNumericCode: (numericCode: string) => import("./types").LocationInfo | undefined;
//# sourceMappingURL=countryIsoInformationService.d.ts.map