import {
	alpha2ToAlpha3,
	getAlpha2Code,
	toAlpha2,
} from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import type { CountryDetailInformation } from "../types/detailedCountryInformation";
import { iso2CodeService } from "./iso2CodeCountryInfoService";

export interface Country extends CountryDetailInformation {
	iso2: string;
	iso3?: string;
}

/** Resolves an ISO-2, ISO-3, numeric code or English name to a full country record. */
export const getCountry = (input: string | number): Country => {
	const value = String(input).trim();
	const iso2 = toAlpha2(value) ?? getAlpha2Code(value, BASIC_LANGUAGE);
	if (!iso2) {
		throw new Error(`Country can not be found for: ${value}`);
	}

	const detail = iso2CodeService.getCountryDetailInfo(iso2);
	if (!detail) {
		throw new Error(`Country information not available for: ${value}`);
	}

	return {
		iso2,
		iso3: alpha2ToAlpha3(iso2),
		...detail,
	};
};
