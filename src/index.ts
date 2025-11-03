import {
	getCountryInformationByIso2Code,
	getCountryInformationByIso3Code,
	getCountryInformationByName,
	getCountryInformationByNumericCode,
} from "./getCountryInformationByName";
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

	printObj(
		getCountryInformationByNumericCode("35"),
		"Information by country numeric code",
	);
};

launchApp();
