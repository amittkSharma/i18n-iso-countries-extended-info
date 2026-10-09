import type { CountryCode } from "../generated/countryDataSet";
import type { TimeZone } from "./countrySource";

export type AlphaCode = "Alpha-2" | "Alpha-3";

/**
 * An ISO 3166-1 alpha-2 code. Known codes are suggested by the editor; any other string
 * is still accepted (and rejected at runtime), so values from user input keep compiling.
 */
export type CountryCodeInput = CountryCode | (string & Record<never, never>);

export type ContinentCode = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";

export interface Others {
	timeZones: TimeZone[];
	/** Internet country-code TLD, e.g. ".de". */
	domain: string;
	/** Set for the few territories (BV, EH, SJ, UM, XK) that have no TLD in actual use; `domain` is then only the conventional ".xx". */
	domainUnofficial?: boolean;
	dateFormat?: string;
}

export interface CurrencyInfo {
	currency: string;
	/** Empty string when the country has no currency name in the dataset. */
	currencyName: string;
	symbol: string;
}

export interface LocationInfo {
	continent: ContinentCode;
	region: string;
	/** Only set for countries spanning several continents. */
	continents?: ContinentCode[];
}

export interface CountryInfo {
	name: string;
	native: string;
	/** Empty string for territories without a capital. */
	capital: string;
	flag: string;
	isdCodes: number[];
	language: {
		code: string;
		/** Empty string when the dataset has no language name. */
		official: string;
		others: string[];
	};
}

export interface CountryDetailInformation
	extends CountryInfo,
		LocationInfo,
		CurrencyInfo,
		Others {}

export interface CountryIsoCodePreview {
	countryName?: string;
	code: string;
}
