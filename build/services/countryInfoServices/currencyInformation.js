"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencyInfoByCountryIso2Code = void 0;
const countryDataSet_1 = require("../../generated/countryDataSet");
const getCurrencyInfoByCountryIso2Code = (iso2Code) => {
    const code = iso2Code.toLocaleUpperCase();
    const completeInfo = code in countryDataSet_1.countriesWithRegionalInfo
        ? countryDataSet_1.countriesWithRegionalInfo[code]
        : undefined;
    const currencyInfo = completeInfo
        ? {
            currency: completeInfo?.currency,
            symbol: completeInfo?.symbol,
            currencyName: completeInfo?.currencyName,
        }
        : undefined;
    return currencyInfo;
};
exports.getCurrencyInfoByCountryIso2Code = getCurrencyInfoByCountryIso2Code;
