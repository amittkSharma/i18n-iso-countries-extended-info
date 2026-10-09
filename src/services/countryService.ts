import {
	alpha2ToAlpha3,
	getAlpha2Code,
	toAlpha2,
} from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import { countriesWithRegionalInfo } from "../generated/countryDataSet";
import type { Country } from "../types/countryApi";

// The dataset's own names (e.g. "Brunei", "Laos") differ from the library's for 18 countries.
const iso2ByDatasetName = new Map(
	Object.entries(countriesWithRegionalInfo).map(([iso2, c]) => [
		c.name.toLowerCase(),
		iso2,
	]),
);

/** Resolves an ISO-2, ISO-3, numeric code or English name to an ISO-2 code. */
export const resolveIso2 = (input: string | number): string => {
	const value = String(input).trim();
	const iso2 =
		toAlpha2(value) ??
		getAlpha2Code(value, BASIC_LANGUAGE) ??
		iso2ByDatasetName.get(value.toLowerCase());
	// toAlpha2 echoes any two-letter input (e.g. "XX"), so also require a dataset entry.
	if (!iso2 || !Object.hasOwn(countriesWithRegionalInfo, iso2)) {
		throw new Error(`Country can not be found for: ${value}`);
	}
	return iso2;
};

// Arrays and objects are copied so callers cannot mutate the shared dataset.
export const getCountryByIso2 = (iso2: string): Country => {
	const c = countriesWithRegionalInfo[iso2];

	return {
		iso2,
		iso3: alpha2ToAlpha3(iso2),
		name: c.name,
		native: c.native,
		capital: c.capital,
		flag: c.flag,
		isdCodes: [...c.phone],
		language: {
			code: c.officialLanguageCode,
			official: c.officialLanguageName,
			others: [...c.languages],
		},
		continent: c.continent,
		region: c.region,
		continents: c.continents && [...c.continents],
		currency: c.currency,
		currencyName: c.currencyName,
		symbol: c.symbol,
		timeZones: c.timeZones.map((zone) => ({ ...zone })),
		domain: c.domain,
		dateFormat: c.dateFormat,
	};
};

export const getCountry = (input: string | number): Country =>
	getCountryByIso2(resolveIso2(input));
