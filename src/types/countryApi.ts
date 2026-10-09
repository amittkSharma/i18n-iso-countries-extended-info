import type {
	CountryCodeInput,
	CountryDetailInformation,
} from "./detailedCountryInformation";

export interface Country extends CountryDetailInformation {
	iso2: string;
	iso3: string;
	/** ISO 3166-1 numeric code as a zero-padded string, e.g. "036". Not the currency's numeric code. */
	numeric: string;
}

export interface LocaleOptions {
	/**
	 * BCP 47 locale, e.g. "fr". `name`, `currencyName` and `language.official` are returned in that language.
	 * Omit it for the dataset's English names; a well-formed locale without translations falls back to those too.
	 */
	locale?: string;
}

/** Every field is optional; all given fields must match (AND). Matching is case-insensitive. */
export interface CountryFilter {
	/** ISO 4217 currency code, e.g. "EUR". */
	currency?: string;
	/** Calling code with or without "+", e.g. 91, "+91", "+1 268". "1" also matches the shared +1 territories. */
	callingCode?: string | number;
	/** Country-code TLD with or without the leading dot, e.g. ".de" or "de". */
	domain?: string;
	/** IANA time zone name, e.g. "Europe/Berlin". Aliases such as "Asia/Calcutta" are not resolved. */
	timeZone?: string;
	/** Continent code ("EU") or English name ("Europe"). Transcontinental countries match each continent. */
	continent?: string;
	/** ISO 639-1 code ("fr"); matches spoken languages and the official language code. */
	language?: string;
}

export interface FormatCurrencyOptions
	extends Omit<Intl.NumberFormatOptions, "style" | "currency"> {
	/** BCP 47 locale; defaults to the country's official language and region, e.g. "de-DE". */
	locale?: string;
}

export type { CountryCodeInput };
