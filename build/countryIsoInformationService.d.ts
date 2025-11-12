export { isCountryIsoOrNumericCodeValid } from "./i18nIsoCountriesService";
import type { IsoCode } from "./types/detailedCountryInformation";
export declare const getCountryInformationByName: (countryName: string) => {
    countryName: string;
    currency?: string | undefined;
    symbol?: string | undefined;
    numericCode?: number | undefined;
    dateFormat?: string;
    iso2Code: string;
    iso3Code: string | undefined;
};
export declare const getCountryInformationByIso2Code: (iso2Code: string) => import("./types/detailedCountryInformation").DetailedCountryInformation;
export declare const getCountryInformationByIso3Code: (iso3Code: string) => import("./types/detailedCountryInformation").DetailedCountryInformation;
export declare const getCountryInformationByNumericCode: (numericCode: string) => import("./types/detailedCountryInformation").DetailedCountryInformation;
export declare const getAllCountriesIsoCodes: (isoCode?: IsoCode) => import("./types/detailedCountryInformation").CountryIsoCodePreview[];
//# sourceMappingURL=countryIsoInformationService.d.ts.map