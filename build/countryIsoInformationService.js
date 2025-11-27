"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryLocationInformationByNumericCode = exports.getCountryGeneralInformationByNumericCode = exports.getCountryDetailInformationByNumericCode = exports.getCountryCurrencyInformationByNumericCode = exports.getCountryLocationInformationByName = exports.getCountryGeneralInformationByName = exports.getCountryDetailInformationByName = exports.getCountryCurrencyInformationByName = exports.getCountryLocationInformationByAlpha3Code = exports.getCountryGeneralInformationByAlpha3Code = exports.getCountryDetailInformationByAlpha3Code = exports.getCountryCurrencyInformationByAlpha3Code = exports.getCountryLocationInformationByAlpha2Code = exports.getCountryGeneralInformationByAlpha2Code = exports.getCountryDetailInformationByAlpha2Code = exports.getCountryCurrencyInformationByAlpha2Code = exports.getCountryAlphaCodeByName = exports.getAllCountriesAlphaCodes = void 0;
const services_1 = require("./services");
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
const getAllCountriesAlphaCodes = (alphaCodeType) => {
    return (0, services_1.getAllCountriesWithIsoCodes)(alphaCodeType);
};
exports.getAllCountriesAlphaCodes = getAllCountriesAlphaCodes;
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
const getCountryAlphaCodeByName = (countryName, alphaCode = "Alpha-2") => {
    return (0, services_1.getCountryIsoCodeByName)(countryName, alphaCode);
};
exports.getCountryAlphaCodeByName = getCountryAlphaCodeByName;
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
const getCountryCurrencyInformationByAlpha2Code = (alpha2Code) => {
    return services_1.iso2CodeService.getCountryCurrencyInfo(alpha2Code);
};
exports.getCountryCurrencyInformationByAlpha2Code = getCountryCurrencyInformationByAlpha2Code;
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
const getCountryDetailInformationByAlpha2Code = (alpha2Code) => {
    return services_1.iso2CodeService.getCountryDetailInfo(alpha2Code);
};
exports.getCountryDetailInformationByAlpha2Code = getCountryDetailInformationByAlpha2Code;
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
const getCountryGeneralInformationByAlpha2Code = (alpha2Code) => {
    return services_1.iso2CodeService.getCountryGeneralInfo(alpha2Code);
};
exports.getCountryGeneralInformationByAlpha2Code = getCountryGeneralInformationByAlpha2Code;
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
const getCountryLocationInformationByAlpha2Code = (alpha2Code) => {
    return services_1.iso2CodeService.getCountryLocationInfo(alpha2Code);
};
exports.getCountryLocationInformationByAlpha2Code = getCountryLocationInformationByAlpha2Code;
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
const getCountryCurrencyInformationByAlpha3Code = (alpha3Code) => {
    return services_1.iso3CodeService.getCountryCurrencyInfo(alpha3Code);
};
exports.getCountryCurrencyInformationByAlpha3Code = getCountryCurrencyInformationByAlpha3Code;
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
const getCountryDetailInformationByAlpha3Code = (alpha3Code) => {
    return services_1.iso3CodeService.getCountryDetailInfo(alpha3Code);
};
exports.getCountryDetailInformationByAlpha3Code = getCountryDetailInformationByAlpha3Code;
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
const getCountryGeneralInformationByAlpha3Code = (alpha3Code) => {
    return services_1.iso3CodeService.getCountryGeneralInfo(alpha3Code);
};
exports.getCountryGeneralInformationByAlpha3Code = getCountryGeneralInformationByAlpha3Code;
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
const getCountryLocationInformationByAlpha3Code = (alpha3Code) => {
    return services_1.iso3CodeService.getCountryLocationInfo(alpha3Code);
};
exports.getCountryLocationInformationByAlpha3Code = getCountryLocationInformationByAlpha3Code;
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
const getCountryCurrencyInformationByName = (name) => {
    return services_1.nameService.getCountryCurrencyInfo(name);
};
exports.getCountryCurrencyInformationByName = getCountryCurrencyInformationByName;
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
const getCountryDetailInformationByName = (name) => {
    return services_1.nameService.getCountryDetailInfo(name);
};
exports.getCountryDetailInformationByName = getCountryDetailInformationByName;
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
const getCountryGeneralInformationByName = (name) => {
    return services_1.nameService.getCountryGeneralInfo(name);
};
exports.getCountryGeneralInformationByName = getCountryGeneralInformationByName;
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
const getCountryLocationInformationByName = (name) => {
    return services_1.nameService.getCountryLocationInfo(name);
};
exports.getCountryLocationInformationByName = getCountryLocationInformationByName;
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
const getCountryCurrencyInformationByNumericCode = (numericCode) => {
    return services_1.numericCodeService.getCountryCurrencyInfo(numericCode);
};
exports.getCountryCurrencyInformationByNumericCode = getCountryCurrencyInformationByNumericCode;
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
const getCountryDetailInformationByNumericCode = (numericCode) => {
    return services_1.numericCodeService.getCountryDetailInfo(numericCode);
};
exports.getCountryDetailInformationByNumericCode = getCountryDetailInformationByNumericCode;
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
const getCountryGeneralInformationByNumericCode = (numericCode) => {
    return services_1.numericCodeService.getCountryGeneralInfo(numericCode);
};
exports.getCountryGeneralInformationByNumericCode = getCountryGeneralInformationByNumericCode;
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
const getCountryLocationInformationByNumericCode = (numericCode) => {
    return services_1.numericCodeService.getCountryLocationInfo(numericCode);
};
exports.getCountryLocationInformationByNumericCode = getCountryLocationInformationByNumericCode;
