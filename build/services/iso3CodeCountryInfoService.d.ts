import type { CountryInfoService } from "../types/countryInfoSerive";
declare class Iso3CodeCountryInfoService implements CountryInfoService {
    private getIso2CodeFromIso3Code;
    getCountryLocationInfo: (iso3Code: string) => import("..").LocationInfo | undefined;
    getCountryCurrencyInfo: (iso3Code: string) => import("..").CurrencyInfo | undefined;
    getCountryGeneralInfo: (iso3Code: string) => import("..").CountryInfo | undefined;
    getCountryDetailInfo: (iso3Code: string) => import("..").CountryDetailInformation | undefined;
}
export declare const iso3CodeService: Iso3CodeCountryInfoService;
export {};
//# sourceMappingURL=iso3CodeCountryInfoService.d.ts.map