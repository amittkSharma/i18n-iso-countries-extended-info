type CountryData = {
    countryNameEn: string;
    countryNameLocal: string;
    countryCode: string;
    currencyCode: string;
    currencyNameEn: string;
    tinType: string;
    tinName: string;
    officialLanguageCode: string;
    officialLanguageNameEn: string;
    officialLanguageNameLocal: string;
    countryCallingCode: string;
    areaCodes?: any[];
    region: string;
    flag: string;
};
type CountryProperty = keyof CountryData;
export declare const countriesData: CountryData[];
export type { CountryData, CountryProperty };
//# sourceMappingURL=flagInformation.d.ts.map