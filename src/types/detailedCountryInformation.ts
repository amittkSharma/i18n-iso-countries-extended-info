export type AlphaCode = "Alpha-2" | "Alpha-3";

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

export interface CountryDetailInformation
	extends CountryInfo,
		LocationInfo,
		CurrencyInfo {}

export interface CountryIsoCodePreview {
	countryName?: string;
	code: string;
}
