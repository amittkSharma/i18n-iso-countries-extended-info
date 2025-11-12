"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencyInformationByCountryIso2Code = void 0;
const currencyInformation_1 = require("./countryData/currencyInformation");
const getCurrencyInformationByCountryIso2Code = (iso2Code) => {
    return iso2Code in currencyInformation_1.currenciesInfo ? currencyInformation_1.currenciesInfo[iso2Code] : undefined;
};
exports.getCurrencyInformationByCountryIso2Code = getCurrencyInformationByCountryIso2Code;
