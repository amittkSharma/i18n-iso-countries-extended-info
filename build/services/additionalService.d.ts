import type { CountryIsoCodePreview, IsoCode } from "../types/detailedCountryInformation";
type IsoCodeType = IsoCode | "both";
export declare const isCountryIsoOrNumericCodeValid: (countryIsoCode: string) => true;
export declare const getAllCountriesWithIsoCodes: (isoCodeType: IsoCodeType) => Array<CountryIsoCodePreview>;
export declare const getCountryIsoCodeByName: (countryName: string, isoCode?: IsoCodeType) => string | undefined;
export {};
//# sourceMappingURL=additionalService.d.ts.map