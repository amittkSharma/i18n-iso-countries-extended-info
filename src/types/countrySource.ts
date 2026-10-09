import type { ContinentCode } from "./detailedCountryInformation";

export interface TimeZone {
	name: string;
	utcOffset: number;
	utcOffsetStr: string;
	dstOffset: number;
	dstOffsetStr: string;
}

export interface CountrySource {
	name: string;
	native: string;
	phone: number[];
	continent: ContinentCode;
	capital: string;
	currency: string;
	languages: string[];
	symbol: string;
	numericCode: number;
	currencyName: string;
	region: string;
	flag: string;
	officialLanguageCode: string;
	officialLanguageName: string;
	dateFormat?: string;
	continents?: ContinentCode[];
	timeZones: TimeZone[];
	domain: string;
}
