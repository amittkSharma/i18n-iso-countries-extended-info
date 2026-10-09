import { log } from "../devUtils/logger";
import type { CountryDomainInfo } from "./types/countryInfo";

const countriesDB = require("countries-db");

// countries-db has .gb for Great Britain; it is reserved but unused, the real ccTLD is .uk.
const domainOverrides: Record<string, string> = { GB: ".uk" };

export const fetchCountryDomains = (countries: Array<string>) => {
	log.info("Fetching Countries Domain information");

	const data: CountryDomainInfo[] = countries.map((code) => {
		const domain =
			domainOverrides[code] ?? countriesDB.getCountry(code)?.domain;

		if (domain) {
			return { countryCode: code, domain };
		}

		log.warn(`No domain information found for country code: ${code}`);
		return {
			countryCode: code,
			domain: `.${code.toLowerCase()}`,
			unofficial: true,
		};
	});

	return data;
};
