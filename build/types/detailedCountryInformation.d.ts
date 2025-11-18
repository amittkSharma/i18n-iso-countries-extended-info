export type IsoCode = "iso-2" | "iso-3";
export interface Others {
    dateFormat?: string;
}
export interface CurrencyInfo {
    currency?: string;
    currencyName?: string;
    symbol?: string;
}
export interface LocationInfo {
    continent: string;
    region: string;
    continents: string[];
}
export interface CountryInfo {
    name: string;
    native: string;
    capital: string;
    flag: string;
    isdCodes: string[];
    language: {
        code: string;
        official: string;
        others: string[];
    };
}
interface AlphaCodes {
    iso2Code: string;
    iso3Code: string;
    numericCode?: number;
}
export interface DetailedCountryInformation extends AlphaCodes {
    name: string;
}
export interface CountryIsoCodePreview {
    countryName?: string;
    code: string;
}
export {};
//# sourceMappingURL=detailedCountryInformation.d.ts.map