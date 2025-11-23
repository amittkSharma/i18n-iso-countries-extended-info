import type { IsoCode } from "./types/detailedCountryInformation";
export declare const getCountryInformationByName: (countryName: string) => import("./types/detailedCountryInformation").CountryDetailInformation | undefined;
export declare const getCountryInformationByIso2Code: (iso2Code: string) => import("./types/detailedCountryInformation").CountryDetailInformation | undefined;
export declare const getCountryInformationByIso3Code: (iso3Code: string) => import("./types/detailedCountryInformation").CountryDetailInformation | undefined;
export declare const getCountryInformationByNumericCode: (numericCode: string) => import("./types/detailedCountryInformation").CountryDetailInformation | undefined;
export declare const getAllCountriesIsoCodes: (isoCode?: IsoCode) => import("./types/detailedCountryInformation").CountryIsoCodePreview[];
//# sourceMappingURL=countryIsoInformationService.d.ts.map