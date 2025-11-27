import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NumericCodeCountryInfoService implements CountryInfoService {
    private getIso2CodeFromNumericCode;
    getCountryLocationInfo: (numericCode: string) => import("../types").LocationInfo | undefined;
    getCountryCurrencyInfo: (numericCode: string) => import("../types").CurrencyInfo | undefined;
    getCountryGeneralInfo: (numericCode: string) => import("../types").CountryInfo | undefined;
    getCountryDetailInfo: (numericCode: string) => import("../types").CountryDetailInformation | undefined;
}
export declare const numericCodeService: NumericCodeCountryInfoService;
export {};
//# sourceMappingURL=numericCodeCountryInfoService.d.ts.map