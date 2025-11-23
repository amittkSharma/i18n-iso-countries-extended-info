import {
	getAlpha2Code,
	getAlpha2Codes,
	getAlpha3Code,
	getAlpha3Codes,
	getName,
	isValid,
} from "i18n-iso-countries";
import { BASIC_LANGUAGE } from "../constants";
import type {
	CountryIsoCodePreview,
	IsoCode,
} from "../types/detailedCountryInformation";

type IsoCodeType = IsoCode | "both";

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
	isoCodeType: IsoCodeType,
): Array<CountryIsoCodePreview> => {
	const codes =
		isoCodeType === "iso-2"
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
	isoCode: IsoCodeType = "iso-2",
) => {
	switch (isoCode) {
		case "iso-2":
			return getAlpha2Code(countryName, BASIC_LANGUAGE);
		case "iso-3":
			return getAlpha3Code(countryName, BASIC_LANGUAGE);
		case "both":
			return `${getAlpha2Code(countryName, BASIC_LANGUAGE)}, ${getAlpha3Code(countryName, BASIC_LANGUAGE)}`;
	}
};
