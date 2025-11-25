/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import {
	getAllCountriesIsoCodes,
	getCountryInformationByIso2Code,
	getCountryInformationByIso3Code,
	getCountryInformationByName,
	getCountryInformationByNumericCode,
} from "../countryIsoInformationService";
import { log } from "./logger";
import { printObj } from "./printObject";

const launchApp = async () => {
	printObj(getCountryInformationByName("India"), "Information by country name");
	printObj(
		getCountryInformationByIso2Code("GB"),
		"Information by country iso2-code",
	);
	printObj(
		getCountryInformationByIso3Code("IND"),
		"Information by country iso3-code",
	);
	printObj(
		getCountryInformationByNumericCode("356"),
		"Information by country numeric code",
	);

	try {
		printObj(
			getCountryInformationByNumericCode("35"),
			"Information by country numeric code",
		);
	} catch (error) {
		log.error(`Error: ${(error as Error).message}`);
	}

	printObj(
		getAllCountriesIsoCodes().length.toString() as any,
		"all alpha-2 codes",
	);

	printObj(
		getAllCountriesIsoCodes("iso-3").length.toString() as any,
		"all alpha-3 codes",
	);
};

launchApp();
