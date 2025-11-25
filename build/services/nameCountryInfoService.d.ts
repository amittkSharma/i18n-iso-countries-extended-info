import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NameCountryInfoService implements CountryInfoService {
    private getIso2CodeFromName;
    getCountryLocationInfo: (name: string) => import("../types/detailedCountryInformation").LocationInfo | undefined;
    getCountryCurrencyInfo: (name: string) => import("../types/detailedCountryInformation").CurrencyInfo | undefined;
    getCountryGeneralInfo: (name: string) => import("../types/detailedCountryInformation").CountryInfo | undefined;
    getCountryDetailInfo: (name: string) => import("../types/detailedCountryInformation").CountryDetailInformation | undefined;
}
export declare const nameService: NameCountryInfoService;
export {};
//# sourceMappingURL=nameCountryInfoService.d.ts.map