export interface CountryCurrencyInfo {
	countryName: string;
	currency: string;
	symbol: string;
	numericCode: number;
	dateFormat?: string;
}

export interface ICountry {
	name: string;
	native: string;
	phone: Array<number>;
	continent: string;
	continents?: Array<string>;
	capital: string;
	currency: Array<string>;
	languages: Array<string>;
}

export interface CountryDomainInfo {
	countryCode: string;
	domain: string;
	/** The TLD is not in use for this country (no source lists one). */
	unofficial?: true;
}

interface TimezoneInfo {
	name: string;
	utcOffset: number;
	utcOffsetStr: string;
	dstOffset: number;
	dstOffsetStr: string;
}

export interface CountryTimeZoneInfo {
	countryCode: string;
	timeZones: Array<TimezoneInfo>;
}
