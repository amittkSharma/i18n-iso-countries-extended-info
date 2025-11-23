"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationInfoByCountryIso2Code = void 0;
const countryDataSet_1 = require("../../generated/countryDataSet");
const getLocationInfoByCountryIso2Code = (iso2Code) => {
    const code = iso2Code.toLocaleUpperCase();
    const completeInfo = code in countryDataSet_1.countriesWithRegionalInfo
        ? countryDataSet_1.countriesWithRegionalInfo[code]
        : undefined;
    const locationInfo = completeInfo
        ? {
            continent: completeInfo.continent,
            region: completeInfo.region,
            continents: completeInfo.continents,
        }
        : undefined;
    return locationInfo;
};
exports.getLocationInfoByCountryIso2Code = getLocationInfoByCountryIso2Code;
