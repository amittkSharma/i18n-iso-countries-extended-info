import {
	getAllCountriesWithIsoCodes,
	iso2CodeService,
	iso3CodeService,
	nameService,
	numericCodeService,
} from "./services";

import type { IsoCode } from "./types/detailedCountryInformation";

export const getCountryInformationByName = (countryName: string) => {
	const info = nameService.getCountryDetailInfo(countryName);
	return info;
};

export const getCountryInformationByIso2Code = (iso2Code: string) => {
	const info = iso2CodeService.getCountryDetailInfo(iso2Code);
	return info;
};

export const getCountryInformationByIso3Code = (iso3Code: string) => {
	const info = iso3CodeService.getCountryDetailInfo(iso3Code);
	return info;
};

export const getCountryInformationByNumericCode = (numericCode: string) => {
	const info = numericCodeService.getCountryDetailInfo(numericCode);
	return info;
};

export const getAllCountriesIsoCodes = (isoCode: IsoCode = "iso-2") => {
	return getAllCountriesWithIsoCodes(isoCode);
};
