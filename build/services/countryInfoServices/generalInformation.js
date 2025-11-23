"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByCountryIso2Code = void 0;
const countryDataSet_1 = require("../../generated/countryDataSet");
const getInfoByCountryIso2Code = (iso2Code) => {
    const code = iso2Code.toLocaleUpperCase();
    const completeInfo = code in countryDataSet_1.countriesWithRegionalInfo
        ? countryDataSet_1.countriesWithRegionalInfo[code]
        : undefined;
    const countryInfo = completeInfo
        ? {
            name: completeInfo?.name,
            native: completeInfo?.native,
            capital: completeInfo?.capital,
            flag: completeInfo?.flag,
            isdCodes: completeInfo?.phone,
            language: {
                code: completeInfo?.officialLanguageCode,
                official: completeInfo?.officialLanguageName,
                others: completeInfo?.languages,
            },
        }
        : undefined;
    return countryInfo;
};
exports.getInfoByCountryIso2Code = getInfoByCountryIso2Code;
