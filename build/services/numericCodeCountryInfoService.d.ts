import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NumericCodeCountryInfoService implements CountryInfoService {
    private getIso2CodeFromNumericCode;
    getCountryLocationInfo: (numericCode: string) => import("..").LocationInfo | undefined;
    getCountryCurrencyInfo: (numericCode: string) => import("..").CurrencyInfo | undefined;
    getCountryGeneralInfo: (numericCode: string) => import("..").CountryInfo | undefined;
    getCountryDetailInfo: (numericCode: string) => import("..").CountryDetailInformation | undefined;
}
export declare const numericCodeService: NumericCodeCountryInfoService;
export {};
//# sourceMappingURL=numericCodeCountryInfoService.d.ts.map