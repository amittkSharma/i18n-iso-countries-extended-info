import {
	getAllCountriesIsoCodes,
	getCountryInformationByIso2Code,
	getCountryInformationByIso3Code,
	getCountryInformationByName,
	getCountryInformationByNumericCode,
} from "./countryIsoInformationService";
import { log } from "./utils/logger";
import { printObj } from "./utils/printObject";

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

	printObj(getAllCountriesIsoCodes(), "all alpha-2 codes");
	printObj(getAllCountriesIsoCodes("iso-3"), "all alpha-3 codes");
};

launchApp();
