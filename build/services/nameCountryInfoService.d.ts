import type { CountryInfoService } from "../types/countryInfoSerive";
declare class NameCountryInfoService implements CountryInfoService {
    private getIso2CodeFromName;
    getCountryLocationInfo: (name: string) => import("../types").LocationInfo | undefined;
    getCountryCurrencyInfo: (name: string) => import("../types").CurrencyInfo | undefined;
    getCountryGeneralInfo: (name: string) => import("../types").CountryInfo | undefined;
    getCountryDetailInfo: (name: string) => import("../types").CountryDetailInformation | undefined;
}
export declare const nameService: NameCountryInfoService;
export {};
//# sourceMappingURL=nameCountryInfoService.d.ts.map