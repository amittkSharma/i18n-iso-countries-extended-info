"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountriesIsoCodes = exports.getCountryInformationByNumericCode = exports.getCountryInformationByIso3Code = exports.getCountryInformationByIso2Code = exports.getCountryInformationByName = void 0;
const currency_1 = require("./data/currency");
const i18nIsoCountriesService_1 = require("./i18nIsoCountriesService");
const getCountryInformationByName = (countryName) => {
    const iso2Code = (0, i18nIsoCountriesService_1.getCountryIsoCodeByName)(countryName, "iso-2");
    if (iso2Code) {
        return {
            countryName,
            iso2Code,
            iso3Code: (0, i18nIsoCountriesService_1.getCountryIsoCodeByName)(countryName, "iso-3"),
            ...(0, currency_1.getCurrencyInformationByCountryIso2Code)(iso2Code),
        };
    }
    throw Error(`failed to get information about ${countryName}`);
};
exports.getCountryInformationByName = getCountryInformationByName;
const getCountryInformationByIso2Code = (iso2Code) => {
    if (iso2Code.length !== 2) {
        throw new Error("Iso-code length is not appropriate, ISO-2 code must have length of 2 characters");
    }
    (0, i18nIsoCountriesService_1.isCountryIsoOrNumericCodeValid)(iso2Code);
    const info = (0, i18nIsoCountriesService_1.getDetailedCountryInformationByIso2Code)(iso2Code);
    return info;
};
exports.getCountryInformationByIso2Code = getCountryInformationByIso2Code;
const getCountryInformationByIso3Code = (iso3Code) => {
    if (iso3Code.length !== 3) {
        throw new Error("Iso-code length is not appropriate, ISO-3 code must have length of 3 characters");
    }
    (0, i18nIsoCountriesService_1.isCountryIsoOrNumericCodeValid)(iso3Code);
    const info = (0, i18nIsoCountriesService_1.getDetailedCountryInformationByIso3Code)(iso3Code);
    return info;
};
exports.getCountryInformationByIso3Code = getCountryInformationByIso3Code;
const getCountryInformationByNumericCode = (numericCode) => {
    (0, i18nIsoCountriesService_1.isCountryIsoOrNumericCodeValid)(numericCode);
    const info = (0, i18nIsoCountriesService_1.getDetailedCountryInformationByNumericCode)(numericCode);
    return info;
};
exports.getCountryInformationByNumericCode = getCountryInformationByNumericCode;
const getAllCountriesIsoCodes = (isoCode = "iso-2") => {
    return (0, i18nIsoCountriesService_1.getAllCountriesWithIsoCodes)(isoCode);
};
exports.getAllCountriesIsoCodes = getAllCountriesIsoCodes;
