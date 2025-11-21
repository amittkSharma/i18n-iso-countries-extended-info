import { isValid } from "i18n-iso-countries";

import type { CountryDetailInformation } from "../types/detailedCountryInformation";
import {
	getCurrencyInfoByCountryIso2Code,
	getInfoByCountryIso2Code,
	getLocationInfoByCountryIso2Code,
} from "./countryInfoServices";

const validateIso2Code = (iso2Code: string) => {
	if (iso2Code.length !== 2) {
		throw new Error(
			"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
		);
	}
	if (!isValid(iso2Code)) {
		throw new Error(`Iso Code/Numeric Code: ${iso2Code} is not valid`);
	}
};

export const getCountryLocationInfoByIso2Code = (iso2Code: string) => {
	validateIso2Code(iso2Code);

	return getLocationInfoByCountryIso2Code(iso2Code);
};

export const getCountryCurrencyInfoByIso2Code = (iso2Code: string) => {
	validateIso2Code(iso2Code);

	return getCurrencyInfoByCountryIso2Code(iso2Code);
};

export const getCountryGeneralInfoByIso2Code = (iso2Code: string) => {
	validateIso2Code(iso2Code);

	return getInfoByCountryIso2Code(iso2Code);
};

export const getCountryDetailInfoByIso2Code = (iso2Code: string) => {
	validateIso2Code(iso2Code);

	const infoRes = getInfoByCountryIso2Code(iso2Code);
	const locRes = getLocationInfoByCountryIso2Code(iso2Code);
	const curRes = getCurrencyInfoByCountryIso2Code(iso2Code);

	const result: CountryDetailInformation | undefined =
		infoRes && locRes && curRes
			? {
					...infoRes,
					...locRes,
					...curRes,
				}
			: undefined;
	return result;
};
