"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountriesIsoCodes = exports.getCountryInformationByNumericCode = exports.getCountryInformationByIso3Code = exports.getCountryInformationByIso2Code = exports.getCountryInformationByName = void 0;
const services_1 = require("./services");
const getCountryInformationByName = (countryName) => {
    const info = services_1.nameService.getCountryDetailInfo(countryName);
    return info;
};
exports.getCountryInformationByName = getCountryInformationByName;
const getCountryInformationByIso2Code = (iso2Code) => {
    const info = services_1.iso2CodeService.getCountryDetailInfo(iso2Code);
    return info;
};
exports.getCountryInformationByIso2Code = getCountryInformationByIso2Code;
const getCountryInformationByIso3Code = (iso3Code) => {
    const info = services_1.iso3CodeService.getCountryDetailInfo(iso3Code);
    return info;
};
exports.getCountryInformationByIso3Code = getCountryInformationByIso3Code;
const getCountryInformationByNumericCode = (numericCode) => {
    const info = services_1.numericCodeService.getCountryDetailInfo(numericCode);
    return info;
};
exports.getCountryInformationByNumericCode = getCountryInformationByNumericCode;
const getAllCountriesIsoCodes = (isoCode = "iso-2") => {
    return (0, services_1.getAllCountriesWithIsoCodes)(isoCode);
};
exports.getAllCountriesIsoCodes = getAllCountriesIsoCodes;
