import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NameCountryInfoService implements CountryInfoService {
    private getIso2CodeFromName;
    getCountryLocationInfo: (name: string) => import("..").LocationInfo | undefined;
    getCountryCurrencyInfo: (name: string) => import("..").CurrencyInfo | undefined;
    getCountryGeneralInfo: (name: string) => import("..").CountryInfo | undefined;
    getCountryDetailInfo: (name: string) => import("..").CountryDetailInformation | undefined;
}
export declare const nameService: NameCountryInfoService;
export {};
//# sourceMappingURL=nameCountryInfoService.d.ts.map