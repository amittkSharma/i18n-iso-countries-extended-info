"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountriesWithIsoCodes = exports.getDetailedCountryInformationByNumericCode = exports.getDetailedCountryInformationByIso3Code = exports.getDetailedCountryInformationByIso2Code = exports.isCountryIsoOrNumericCodeValid = exports.getCountryIsoCodeByName = void 0;
/** biome-ignore-all lint/style/noNonNullAssertion:off */
const i18n_iso_countries_1 = require("i18n-iso-countries");
const constants_1 = require("./constants");
const countryCurrencyInformation_1 = require("./countryCurrencyInformation");
const getCountryOfficialNameByCode = (code, select = "official") => {
    const countryName = (0, i18n_iso_countries_1.getName)(code, constants_1.BASIC_LANGUAGE, {
        select: select,
    });
    return countryName;
};
const getCountryIsoCodeByName = (countryName, isoCode = "iso-2") => {
    switch (isoCode) {
        case "iso-2":
            return (0, i18n_iso_countries_1.getAlpha2Code)(countryName, constants_1.BASIC_LANGUAGE);
        case "iso-3":
            return (0, i18n_iso_countries_1.getAlpha3Code)(countryName, constants_1.BASIC_LANGUAGE);
        case "both":
            return `${(0, i18n_iso_countries_1.getAlpha2Code)(countryName, constants_1.BASIC_LANGUAGE)},${(0, i18n_iso_countries_1.getAlpha3Code)(countryName, constants_1.BASIC_LANGUAGE)}`;
    }
};
exports.getCountryIsoCodeByName = getCountryIsoCodeByName;
const isCountryIsoOrNumericCodeValid = (countryIsoCode) => {
    const isCountryIsoCode = (0, i18n_iso_countries_1.isValid)(countryIsoCode);
    if (isCountryIsoCode) {
        return isCountryIsoCode;
    }
    else {
        throw new Error(`Iso Code/Numeric Code: ${countryIsoCode} is not valid`);
    }
};
exports.isCountryIsoOrNumericCodeValid = isCountryIsoOrNumericCodeValid;
const getDetailedCountryInformationByIso2Code = (countryIso2ode) => {
    const countryName = getCountryOfficialNameByCode(countryIso2ode);
    const countryIso3Code = (0, i18n_iso_countries_1.alpha2ToAlpha3)(countryIso2ode);
    const countryCurrencyInfo = (0, countryCurrencyInformation_1.getCurrencyInformationByCountryIso2Code)(countryIso2ode);
    const detailedCountryInfo = {
        name: countryName,
        iso2Code: countryIso2ode,
        iso3Code: countryIso3Code,
        ...countryCurrencyInfo,
    };
    return detailedCountryInfo;
};
exports.getDetailedCountryInformationByIso2Code = getDetailedCountryInformationByIso2Code;
const getDetailedCountryInformationByIso3Code = (countryIso3Code) => {
    const countryName = getCountryOfficialNameByCode(countryIso3Code);
    const countryIso2Code = (0, i18n_iso_countries_1.alpha3ToAlpha2)(countryIso3Code);
    const countryCurrencyInfo = (0, countryCurrencyInformation_1.getCurrencyInformationByCountryIso2Code)(countryIso2Code);
    const detailedCountryInfo = {
        name: countryName,
        iso2Code: countryIso2Code,
        iso3Code: countryIso3Code,
        ...countryCurrencyInfo,
    };
    return detailedCountryInfo;
};
exports.getDetailedCountryInformationByIso3Code = getDetailedCountryInformationByIso3Code;
const getDetailedCountryInformationByNumericCode = (countryNumericCode) => {
    const countryIso2Code = (0, i18n_iso_countries_1.numericToAlpha2)(countryNumericCode);
    const countryIso3Code = (0, i18n_iso_countries_1.numericToAlpha3)(countryNumericCode);
    const countryName = getCountryOfficialNameByCode(countryIso2Code);
    const countryCurrencyInfo = (0, countryCurrencyInformation_1.getCurrencyInformationByCountryIso2Code)(countryIso2Code);
    const detailedCountryInfo = {
        name: countryName,
        iso2Code: countryIso2Code,
        iso3Code: countryIso3Code,
        ...countryCurrencyInfo,
    };
    return detailedCountryInfo;
};
exports.getDetailedCountryInformationByNumericCode = getDetailedCountryInformationByNumericCode;
const getAllCountriesWithIsoCodes = (isoCodeType) => {
    const codes = isoCodeType === "iso-2"
        ? Object.keys((0, i18n_iso_countries_1.getAlpha2Codes)())
        : Object.keys((0, i18n_iso_countries_1.getAlpha3Codes)());
    return codes.map((code) => {
        return {
            code,
            countryName: getCountryOfficialNameByCode(code),
        };
    });
};
exports.getAllCountriesWithIsoCodes = getAllCountriesWithIsoCodes;
