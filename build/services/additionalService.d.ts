import type { AlphaCode, CountryIsoCodePreview } from "../types/detailedCountryInformation";
export declare const isCountryIsoOrNumericCodeValid: (countryIsoCode: string) => true;
export declare const getAllCountriesWithIsoCodes: (alphaCodeType: AlphaCode) => Array<CountryIsoCodePreview>;
export declare const getCountryIsoCodeByName: (countryName: string, alphaCode?: AlphaCode | "both") => string | undefined;
//# sourceMappingURL=additionalService.d.ts.map