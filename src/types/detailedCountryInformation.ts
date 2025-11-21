export type IsoCode = "iso-2" | "iso-3";

export interface Others {
	// timeZones: string[];
	dateFormat?: string;
}

export interface CurrencyInfo {
	currency?: string;
	currencyName?: string;
	symbol?: string;
}

export interface LocationInfo {
	continent?: string;
	region?: string;
	continents?: string[];
}

export interface CountryInfo {
	name?: string;
	native?: string;
	capital?: string;
	flag?: string;
	isdCodes?: number[];
	language: {
		code?: string;
		official?: string;
		others?: string[];
	};
}

interface AlphaCodes {
	iso2Code: string;
	iso3Code: string;
	numericCode?: number;
}

export interface CountryDetailInformation
	extends CountryInfo,
		LocationInfo,
		CurrencyInfo {}

export interface DetailedCountryInformation extends CurrencyInfo, AlphaCodes {
	name: string;
}

export interface CountryIsoCodePreview {
	countryName?: string;
	code: string;
}
