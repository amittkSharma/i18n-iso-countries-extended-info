import { getAlpha2Code, getAlpha3Code } from "i18n-iso-countries";
import { log } from "./utils/logger";

type IsoCodeType = "iso-2" | "iso-3" | "both";

export const getCountryIsoCodeByName = (
	countryName: string,
	isoCode: IsoCodeType = "iso-2",
) => {
	log.info(`Getting country name by iso-code: ${isoCode}`);
	switch (isoCode) {
		case "iso-2":
			return { iso2Code: getAlpha2Code(countryName, "en") };
		case "iso-3":
			return { iso3Code: getAlpha3Code(countryName, "en") };
		case "both":
			return {
				iso2Code: getAlpha2Code(countryName, "en"),
				iso3Code: getAlpha3Code(countryName, "en"),
			};
	}
};
