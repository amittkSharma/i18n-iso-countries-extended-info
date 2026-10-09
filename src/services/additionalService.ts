import {
	getAlpha2Code,
	getAlpha2Codes,
	getAlpha3Code,
	getAlpha3Codes,
	getName,
	isValid,
} from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import type {
	AlphaCode,
	CountryIsoCodePreview,
} from "../types/detailedCountryInformation";

type Select = "all" | "official" | "alias";

const getCountryOfficialNameByCode = (
	code: string,
	select: Select = "official",
) => {
	const countryName = getName(code, BASIC_LANGUAGE, {
		select: select,
	});

	return countryName;
};

export const isCountryIsoOrNumericCodeValid = (countryIsoCode: string) => {
	const isCountryIsoCode = isValid(countryIsoCode);
	if (isCountryIsoCode) {
		return isCountryIsoCode;
	} else {
		throw new Error(`Iso Code/Numeric Code: ${countryIsoCode} is not valid`);
	}
};

export const getAllCountriesWithIsoCodes = (
	alphaCodeType: AlphaCode,
): Array<CountryIsoCodePreview> => {
	const codes =
		alphaCodeType === "Alpha-2"
			? Object.keys(getAlpha2Codes())
			: Object.keys(getAlpha3Codes());
	return codes.map((code) => {
		return {
			code,
			countryName: getCountryOfficialNameByCode(code),
		};
	});
};

export const getCountryIsoCodeByName = (
	countryName: string,
	alphaCode: AlphaCode | "both" = "Alpha-2",
) => {
	switch (alphaCode) {
		case "Alpha-2":
			return getAlpha2Code(countryName, BASIC_LANGUAGE);
		case "Alpha-3":
			return getAlpha3Code(countryName, BASIC_LANGUAGE);
		case "both":
			return `${getAlpha2Code(countryName, BASIC_LANGUAGE)}, ${getAlpha3Code(countryName, BASIC_LANGUAGE)}`;
	}
};
