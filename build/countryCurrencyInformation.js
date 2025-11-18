"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencyInformationByCountryIso2Code = void 0;
const countryDataSet_1 = require("./generated/countryDataSet");
const getCurrencyInformationByCountryIso2Code = (iso2Code) => {
    const completeInfo = iso2Code in countryDataSet_1.countriesWithRegionalInfo
        ? countryDataSet_1.countriesWithRegionalInfo[iso2Code]
        : undefined;
    const currencyInfo = {
        currency: completeInfo?.currency,
        symbol: completeInfo?.symbol,
        currencyName: completeInfo?.currencyName,
    };
    return currencyInfo;
};
exports.getCurrencyInformationByCountryIso2Code = getCurrencyInformationByCountryIso2Code;
