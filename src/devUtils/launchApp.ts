/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import {
	getAllCountriesAlphaCodes,
	getCountryAlphaCodeByName,
	getCountryGeneralInformationByAlpha2Code,
	getCountryGeneralInformationByAlpha3Code,
	getCountryGeneralInformationByName,
	getCountryGeneralInformationByNumericCode,
} from "../countryIsoInformationService";
import { log } from "./logger";
import { printObj } from "./printObject";

const launchApp = async () => {
	printObj(
		getCountryGeneralInformationByName("India"),
		"Information by country name",
	);
	printObj(
		getCountryGeneralInformationByAlpha2Code("IN"),
		"Information by country iso2-code",
	);
	printObj(
		getCountryGeneralInformationByAlpha3Code("IND"),
		"Information by country iso3-code",
	);
	printObj(
		getCountryGeneralInformationByNumericCode("356"),
		"Information by country numeric code",
	);

	try {
		printObj(
			getCountryGeneralInformationByNumericCode("35"),
			"Information by country numeric code",
		);
	} catch (error) {
		log.error(`Error: ${(error as Error).message}`);
	}

	printObj(
		getCountryAlphaCodeByName("India", "Alpha-2") as any,
		"alpha-2 code for India",
	);

	printObj(
		getCountryAlphaCodeByName("India", "Alpha-3") as any,
		"alpha-3 code for India",
	);

	printObj(
		getCountryAlphaCodeByName("India", "both") as any,
		"both (alpha-2 / alpha-3) codes for India",
	);

	printObj(getAllCountriesAlphaCodes("Alpha-2")[0], "all alpha-2 codes");

	printObj(getAllCountriesAlphaCodes("Alpha-3")[0], "all alpha-3 codes");
};

launchApp();
