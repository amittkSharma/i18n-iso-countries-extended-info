import { getCurrencyInformationByCountryIso2Code } from "./data/currency";
import { getCountryIsoCodeByName } from "./getCountryIsoCodeByName";

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
