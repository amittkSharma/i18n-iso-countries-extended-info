"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iso2CodeService = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
const countryInfoServices_1 = require("./countryInfoServices");
class Iso2CodeCountryInfoService {
    validateIso2Code = (iso2Code) => {
        if (iso2Code.length !== 2) {
            throw new Error("Iso-code length is not appropriate, ISO-2 code must have length of 2 characters");
        }
        if (!(0, i18n_iso_countries_1.isValid)(iso2Code)) {
            throw new Error(`Iso Code/Numeric Code: ${iso2Code} is not valid`);
        }
    };
    getCountryLocationInfo = (iso2Code) => {
        this.validateIso2Code(iso2Code);
        return (0, countryInfoServices_1.getLocationInfoByCountryIso2Code)(iso2Code);
    };
    getCountryCurrencyInfo = (iso2Code) => {
        this.validateIso2Code(iso2Code);
        return (0, countryInfoServices_1.getCurrencyInfoByCountryIso2Code)(iso2Code);
    };
    getCountryGeneralInfo = (iso2Code) => {
        this.validateIso2Code(iso2Code);
        return (0, countryInfoServices_1.getInfoByCountryIso2Code)(iso2Code);
    };
    getCountryDetailInfo = (iso2Code) => {
        this.validateIso2Code(iso2Code);
        const infoRes = (0, countryInfoServices_1.getInfoByCountryIso2Code)(iso2Code);
        const locRes = (0, countryInfoServices_1.getLocationInfoByCountryIso2Code)(iso2Code);
        const curRes = (0, countryInfoServices_1.getCurrencyInfoByCountryIso2Code)(iso2Code);
        const result = infoRes && locRes && curRes
            ? {
                ...infoRes,
                ...locRes,
                ...curRes,
            }
            : undefined;
        return result;
    };
}
exports.iso2CodeService = new Iso2CodeCountryInfoService();
