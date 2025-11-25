import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NumericCodeCountryInfoService implements CountryInfoService {
    private getIso2CodeFromNumericCode;
    getCountryLocationInfo: (numericCode: string) => import("../types/detailedCountryInformation").LocationInfo | undefined;
    getCountryCurrencyInfo: (numericCode: string) => import("../types/detailedCountryInformation").CurrencyInfo | undefined;
    getCountryGeneralInfo: (numericCode: string) => import("../types/detailedCountryInformation").CountryInfo | undefined;
    getCountryDetailInfo: (numericCode: string) => import("../types/detailedCountryInformation").CountryDetailInformation | undefined;
}
export declare const numericCodeService: NumericCodeCountryInfoService;
export {};
//# sourceMappingURL=numericCodeCountryInfoService.d.ts.map