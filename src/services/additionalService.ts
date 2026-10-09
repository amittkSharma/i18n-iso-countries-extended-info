import {
	getAlpha2Codes,
	getAlpha3Codes,
	getName,
} from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import type {
	AlphaCode,
	CountryIsoCodePreview,
} from "../types/detailedCountryInformation";

export const getAllCountriesWithIsoCodes = (
	alphaCodeType: AlphaCode,
): Array<CountryIsoCodePreview> => {
	const codes = Object.keys(
		alphaCodeType === "Alpha-2" ? getAlpha2Codes() : getAlpha3Codes(),
	);
	return codes.map((code) => ({
		code,
		countryName: getName(code, BASIC_LANGUAGE),
	}));
};
