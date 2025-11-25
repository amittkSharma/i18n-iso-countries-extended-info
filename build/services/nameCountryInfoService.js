"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameService = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
const constants_1 = require("../constants");
const iso2CodeCountryInfoService_1 = require("./iso2CodeCountryInfoService");
class NameCountryInfoService {
    getIso2CodeFromName = (name) => {
        const iso2Code = (0, i18n_iso_countries_1.getAlpha2Code)(name, constants_1.BASIC_LANGUAGE);
        if (iso2Code) {
            return iso2Code;
        }
        else {
            throw new Error(`Iso-2 code can not be found for: ${name}`);
        }
    };
    getCountryLocationInfo = (name) => {
        const iso2Code = this.getIso2CodeFromName(name);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryLocationInfo(iso2Code);
    };
    getCountryCurrencyInfo = (name) => {
        const iso2Code = this.getIso2CodeFromName(name);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryCurrencyInfo(iso2Code);
    };
    getCountryGeneralInfo = (name) => {
        const iso2Code = this.getIso2CodeFromName(name);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryGeneralInfo(iso2Code);
    };
    getCountryDetailInfo = (name) => {
        const iso2Code = this.getIso2CodeFromName(name);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryDetailInfo(iso2Code);
    };
}
exports.nameService = new NameCountryInfoService();
