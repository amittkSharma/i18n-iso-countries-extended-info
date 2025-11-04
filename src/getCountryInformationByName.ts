import {
	getCountryIsoCodeByName,
	getDetailedCountryInformationByIso2Code,
	getDetailedCountryInformationByIso3Code,
	getDetailedCountryInformationByNumericCode,
	isCountryIsoOrNumericCodeValid,
} from "./countryIsoInformationService";
import { getCurrencyInformationByCountryIso2Code } from "./data/currency";

export const getCountryInformationByName = (countryName: string) => {
	const { iso2Code, iso3Code } = getCountryIsoCodeByName(countryName, "both");

	if (iso2Code) {
		return {
			countryName,
			iso2Code,
			iso3Code,
			...getCurrencyInformationByCountryIso2Code(iso2Code),
		};
	}

	throw Error(`failed to get information about ${countryName}`);
};

export const getCountryInformationByIso2Code = (iso2Code: string) => {
	if (iso2Code.length !== 2) {
		throw new Error(
			"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
		);
	}
	isCountryIsoOrNumericCodeValid(iso2Code);
	const info = getDetailedCountryInformationByIso2Code(iso2Code);
	return info;
};

export const getCountryInformationByIso3Code = (iso3Code: string) => {
	if (iso3Code.length !== 3) {
		throw new Error(
			"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
		);
	}
	isCountryIsoOrNumericCodeValid(iso3Code);
	const info = getDetailedCountryInformationByIso3Code(iso3Code);
	return info;
};

export const getCountryInformationByNumericCode = (numericCode: string) => {
	isCountryIsoOrNumericCodeValid(numericCode);
	const info = getDetailedCountryInformationByNumericCode(numericCode);
	return info;
};
