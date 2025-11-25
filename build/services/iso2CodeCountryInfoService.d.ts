import type { CountryInfoService } from "../types/countryInfoSerive";
import type { CountryDetailInformation } from "../types/detailedCountryInformation";
declare class Iso2CodeCountryInfoService implements CountryInfoService {
    private validateIso2Code;
    getCountryLocationInfo: (iso2Code: string) => import("../types/detailedCountryInformation").LocationInfo | undefined;
    getCountryCurrencyInfo: (iso2Code: string) => import("../types/detailedCountryInformation").CurrencyInfo | undefined;
    getCountryGeneralInfo: (iso2Code: string) => import("../types/detailedCountryInformation").CountryInfo | undefined;
    getCountryDetailInfo: (iso2Code: string) => CountryDetailInformation | undefined;
}
export declare const iso2CodeService: Iso2CodeCountryInfoService;
export {};
//# sourceMappingURL=iso2CodeCountryInfoService.d.ts.map