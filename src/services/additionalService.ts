import {
	getAlpha2Codes,
	getAlpha3Codes,
	getName,
	toAlpha2,
} from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import type { LocaleOptions } from "../types/countryApi";
import type {
	AlphaCode,
	CountryIsoCodePreview,
} from "../types/detailedCountryInformation";
import { createRegionNamer } from "./localizeService";

export const getAllCountriesWithIsoCodes = (
	alphaCodeType: AlphaCode,
	{ locale }: LocaleOptions = {},
): Array<CountryIsoCodePreview> => {
	const codes = Object.keys(
		alphaCodeType === "Alpha-2" ? getAlpha2Codes() : getAlpha3Codes(),
	);
	const nameIn = createRegionNamer(locale);

	return codes.map((code) => ({
		code,
		countryName: nameIn(
			toAlpha2(code) as string,
			getName(code, BASIC_LANGUAGE) as string,
		),
	}));
};
