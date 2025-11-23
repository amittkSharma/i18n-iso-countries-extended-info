"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryIsoCodeByName = exports.getAllCountriesWithIsoCodes = exports.isCountryIsoOrNumericCodeValid = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
const constants_1 = require("../constants");
const getCountryOfficialNameByCode = (code, select = "official") => {
    const countryName = (0, i18n_iso_countries_1.getName)(code, constants_1.BASIC_LANGUAGE, {
        select: select,
    });
    return countryName;
};
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
const getCountryIsoCodeByName = (countryName, isoCode = "iso-2") => {
    switch (isoCode) {
        case "iso-2":
            return (0, i18n_iso_countries_1.getAlpha2Code)(countryName, constants_1.BASIC_LANGUAGE);
        case "iso-3":
            return (0, i18n_iso_countries_1.getAlpha3Code)(countryName, constants_1.BASIC_LANGUAGE);
        case "both":
            return `${(0, i18n_iso_countries_1.getAlpha2Code)(countryName, constants_1.BASIC_LANGUAGE)}, ${(0, i18n_iso_countries_1.getAlpha3Code)(countryName, constants_1.BASIC_LANGUAGE)}`;
    }
};
exports.getCountryIsoCodeByName = getCountryIsoCodeByName;
