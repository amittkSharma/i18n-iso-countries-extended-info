"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iso3CodeService = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
const iso2CodeCountryInfoService_1 = require("./iso2CodeCountryInfoService");
class Iso3CodeCountryInfoService {
    getIso2CodeFromIso3Code = (iso3Code) => {
        if (iso3Code.length !== 3) {
            throw new Error("Iso-code length is not appropriate, ISO-3 code must have length of 3 characters");
        }
        if (!(0, i18n_iso_countries_1.isValid)(iso3Code)) {
            throw new Error(`Iso-3 Code: ${iso3Code} is not valid`);
        }
        const iso2Code = (0, i18n_iso_countries_1.toAlpha2)(iso3Code);
        if (iso2Code) {
            return iso2Code;
        }
        else {
            throw new Error(`Iso-2 code can not be found for: ${iso3Code}`);
        }
    };
    getCountryLocationInfo = (iso3Code) => {
        const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryLocationInfo(iso2Code);
    };
    getCountryCurrencyInfo = (iso3Code) => {
        const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryCurrencyInfo(iso2Code);
    };
    getCountryGeneralInfo = (iso3Code) => {
        const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryGeneralInfo(iso2Code);
    };
    getCountryDetailInfo = (iso3Code) => {
        const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryDetailInfo(iso2Code);
    };
}
exports.iso3CodeService = new Iso3CodeCountryInfoService();
