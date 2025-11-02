import {
	getCountryInformationByIso2Code,
	getCountryInformationByIso3Code,
	getCountryInformationByName,
} from "./getCountryInformationByName";
import { printObj } from "./utils/printObject";

const launchApp = async () => {
	printObj(getCountryInformationByName("India"), "Information by country name");
	printObj(
		getCountryInformationByIso2Code("IN"),
		"Information by country iso2-code",
	);
	printObj(
		getCountryInformationByIso3Code("IND"),
		"Information by country iso3-code",
	);
};

launchApp();
