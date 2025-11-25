"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericCodeService = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
const iso2CodeCountryInfoService_1 = require("./iso2CodeCountryInfoService");
class NumericCodeCountryInfoService {
    getIso2CodeFromNumericCode = (numericCode) => {
        if (!(0, i18n_iso_countries_1.isValid)(numericCode)) {
            throw new Error(`Numeric Code: ${numericCode} is not valid`);
        }
        const iso2Code = (0, i18n_iso_countries_1.toAlpha2)(numericCode);
        if (iso2Code) {
            return iso2Code;
        }
        else {
            throw new Error(`Iso-2 code can not be found for: ${numericCode}`);
        }
    };
    getCountryLocationInfo = (numericCode) => {
        const iso2Code = this.getIso2CodeFromNumericCode(numericCode);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryLocationInfo(iso2Code);
    };
    getCountryCurrencyInfo = (numericCode) => {
        const iso2Code = this.getIso2CodeFromNumericCode(numericCode);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryCurrencyInfo(iso2Code);
    };
    getCountryGeneralInfo = (numericCode) => {
        const iso2Code = this.getIso2CodeFromNumericCode(numericCode);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryGeneralInfo(iso2Code);
    };
    getCountryDetailInfo = (numericCode) => {
        const iso2Code = this.getIso2CodeFromNumericCode(numericCode);
        return iso2CodeCountryInfoService_1.iso2CodeService.getCountryDetailInfo(iso2Code);
    };
}
exports.numericCodeService = new NumericCodeCountryInfoService();
