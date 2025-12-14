import { log } from "../devUtils/logger";
import type { CountryDomainInfo } from "./types/countryInfo";

const countriesDB = require("countries-db");

export const fetchCountryDomains = (countries: Array<string>) => {
	log.info;
	("Fetching Countries Domain information");

	const data: CountryDomainInfo[] = countries.map((code) => {
		const f = countriesDB.getCountry(code);

		if (f?.domain) {
			return {
				countryCode: code,
				domain: f.domain,
			};
		} else {
			log.warn(`No domain information found for country code: ${code}`);
			return {
				countryCode: code,
				domain: `.${code.toLowerCase()} (unofficial)`,
			};
		}
	});

	return data;
};
