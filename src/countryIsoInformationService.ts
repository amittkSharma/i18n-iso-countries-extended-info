import {
	formatCurrency as formatCountryCurrency,
	getAllCountriesWithIsoCodes,
	getCountry as resolveCountry,
	findCountries as searchCountries,
} from "./services";
import type {
	AlphaCode,
	Country,
	CountryCodeInput,
	CountryFilter,
	FormatCurrencyOptions,
} from "./types";

/**
 * Retrieves the complete country record (codes, names, capital, languages, continent,
 * currency, time zones, domain) from an ISO-2 code, ISO-3 code, numeric code or English country name.
 * @param input - ISO-2/ISO-3/numeric code or English name, e.g. "DE", "DEU", 276, "Germany".
 * @example
 * ```ts
 * const germany = getCountry("DEU");
 * const sameGermany = getCountry("germany");
 * const { capital, currency, timeZones } = getCountry(276);
 * ```
 * @returns The full country record.
 * @throws Will throw an error if no country matches the input.
 */
export const getCountry = (input: CountryCodeInput | number): Country => {
	return resolveCountry(input);
};

/**
 * Finds every country matching all given criteria (reverse lookup).
 * Matching is case-insensitive and ignores surrounding whitespace. Results are ordered by ISO-2 code;
 * no match returns an empty array, and an empty filter returns every country.
 * @param filter - Any of `currency`, `callingCode`, `domain`, `timeZone`, `continent`, `language`.
 * @example
 * ```ts
 * findCountries({ currency: "EUR" });                    // 37 countries
 * findCountries({ callingCode: "+1 268" });              // Antigua and Barbuda
 * findCountries({ continent: "Europe", language: "de" });
 * findCountries({ domain: ".de" });
 * ```
 * @returns The matching country records.
 * @throws Will throw an error if the filter is not an object, has an unknown key, or a value of the wrong type.
 */
export const findCountries = (filter: CountryFilter): Country[] => {
	return searchCountries(filter);
};

/**
 * Formats an amount in the currency of a country, using the country's official language and region
 * for the number format (e.g. 1234.5 in Germany is "1.234,50 €").
 * @param amount - A finite number.
 * @param country - ISO-2/ISO-3/numeric code or English name, e.g. "DE", "DEU", 276, "Germany".
 * @param options - `locale` overrides the number format; other `Intl.NumberFormat` options pass through (except `style` and `currency`).
 * @example
 * ```ts
 * formatCurrency(1234.5, "US");                       // "$1,234.50"
 * formatCurrency(1234.5, "DE");                       // "1.234,50 €"
 * formatCurrency(1234.5, "DE", { locale: "en-US" });  // "€1,234.50"
 * ```
 * @returns The formatted amount.
 * @throws Will throw an error if the amount is not a finite number or the country is not found.
 */
export const formatCurrency = (
	amount: number,
	country: CountryCodeInput | number,
	options?: FormatCurrencyOptions,
): string => {
	return formatCountryCurrency(amount, country, options);
};

/**
 * Lists every country's ISO code together with its English name.
 * @param alphaCodeType - "Alpha-2" or "Alpha-3".
 * @example
 * ```ts
 * getAllCountriesAlphaCodes("Alpha-2"); // [{ code: "AD", countryName: "Andorra" }, ...]
 * ```
 * @returns An array of `{ code, countryName }`.
 */
export const getAllCountriesAlphaCodes = (alphaCodeType: AlphaCode) => {
	return getAllCountriesWithIsoCodes(alphaCodeType);
};
