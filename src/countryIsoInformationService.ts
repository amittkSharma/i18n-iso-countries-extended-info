/** biome-ignore-all lint/style/noNonNullAssertion:off */
import {
	alpha2ToAlpha3,
	alpha3ToAlpha2,
	getAlpha2Code,
	getAlpha2Codes,
	getAlpha3Code,
	getAlpha3Codes,
	getName,
	isValid,
	numericToAlpha2,
	numericToAlpha3,
} from "i18n-iso-countries";
import { BASIC_LANGUAGE } from "./constants";
import { getCurrencyInformationByCountryIso2Code } from "./data/currency";
import type {
	CountryIsoCodePreview,
	DetailedCountryInformation,
} from "./types/detailedCountryInformation";

type IsoCodeType = "iso-2" | "iso-3" | "both";

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

export const getCountryIsoCodeByName = (
	countryName: string,
	isoCode: IsoCodeType = "iso-2",
) => {
	switch (isoCode) {
		case "iso-2":
			return { iso2Code: getAlpha2Code(countryName, BASIC_LANGUAGE) };
		case "iso-3":
			return { iso3Code: getAlpha3Code(countryName, BASIC_LANGUAGE) };
		case "both":
			return {
				iso2Code: getAlpha2Code(countryName, BASIC_LANGUAGE),
				iso3Code: getAlpha3Code(countryName, BASIC_LANGUAGE),
			};
	}
};

export const isCountryIsoOrNumericCodeValid = (countryIsoCode: string) => {
	const isCountryIsoCode = isValid(countryIsoCode);
	if (isCountryIsoCode) {
		return isCountryIsoCode;
	} else {
		throw new Error(`Iso Code/Numeric Code: ${countryIsoCode} is not valid`);
	}
};

export const getDetailedCountryInformationByIso2Code = (
	countryIso2ode: string,
) => {
	const countryName = getCountryOfficialNameByCode(countryIso2ode);

	const countryIso3Code = alpha2ToAlpha3(countryIso2ode);
	const countryCurrencyInfo =
		getCurrencyInformationByCountryIso2Code(countryIso2ode);

	const detailedCountryInfo: DetailedCountryInformation = {
		countryName: countryName!,
		iso2Code: countryIso2ode,
		iso3Code: countryIso3Code!,
		...countryCurrencyInfo,
	};

	return detailedCountryInfo;
};

export const getDetailedCountryInformationByIso3Code = (
	countryIso3Code: string,
) => {
	const countryName = getCountryOfficialNameByCode(countryIso3Code);
	const countryIso2Code = alpha3ToAlpha2(countryIso3Code);
	const countryCurrencyInfo = getCurrencyInformationByCountryIso2Code(
		countryIso2Code!,
	);

	const detailedCountryInfo: DetailedCountryInformation = {
		countryName: countryName!,
		iso2Code: countryIso2Code!,
		iso3Code: countryIso3Code,
		...countryCurrencyInfo,
	};

	return detailedCountryInfo;
};

export const getDetailedCountryInformationByNumericCode = (
	countryNumericCode: string,
) => {
	const countryIso2Code = numericToAlpha2(countryNumericCode);
	const countryIso3Code = numericToAlpha3(countryNumericCode);
	const countryName = getCountryOfficialNameByCode(countryIso2Code!);
	const countryCurrencyInfo = getCurrencyInformationByCountryIso2Code(
		countryIso2Code!,
	);

	const detailedCountryInfo: DetailedCountryInformation = {
		countryName: countryName!,
		iso2Code: countryIso2Code!,
		iso3Code: countryIso3Code!,
		...countryCurrencyInfo,
	};

	return detailedCountryInfo;
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
