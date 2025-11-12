import type { CountryIsoCodePreview, DetailedCountryInformation, IsoCode } from "./types/detailedCountryInformation";
type IsoCodeType = IsoCode | "both";
export declare const getCountryIsoCodeByName: (countryName: string, isoCode?: IsoCodeType) => string | undefined;
export declare const isCountryIsoOrNumericCodeValid: (countryIsoCode: string) => true;
export declare const getDetailedCountryInformationByIso2Code: (countryIso2ode: string) => DetailedCountryInformation;
export declare const getDetailedCountryInformationByIso3Code: (countryIso3Code: string) => DetailedCountryInformation;
export declare const getDetailedCountryInformationByNumericCode: (countryNumericCode: string) => DetailedCountryInformation;
export declare const getAllCountriesWithIsoCodes: (isoCodeType: IsoCodeType) => Array<CountryIsoCodePreview>;
export {};
//# sourceMappingURL=i18nIsoCountriesService.d.ts.map