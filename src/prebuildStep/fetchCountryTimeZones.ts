// biome-ignore assist/source/organizeImports: off
import { getAllCountries } from "countries-and-timezones";
import fs from "node:fs";
import * as path from "node:path";
import { log } from "../devUtils/logger";

// !!Note: This function is not called automatically, it is to be run manually when time zone data needs to be updated!!
export const fetchCountryTimeZones = () => {
	log.info;
	("Fetching Country Time Zone Information");
	const timeZoneData = getAllCountries();
	fs.writeFileSync(
		path.join(__dirname, "./data/countryTimeZoneInformation.json"),
		JSON.stringify(timeZoneData, null, 2),
	);
};
