import { type Country, getAllCountries } from "countries-and-timezones";
import { log } from "../devUtils/logger";
import type { CountryTimeZoneInfo } from "./types/countryCurrencyInfo";

const missingTimeZones: Record<string, string[]> = {
	BV: ["Europe/Berlin"],
	HM: ["Indian/Maldives"],
	XK: ["Europe/Berlin", "Europe/Zurich"],
};

export const fetchCountryTimeZones = (countries: Array<string>) => {
	log.info;
	("Fetching Country Time Zone Information");

	const data: CountryTimeZoneInfo[] = countries.map((code) => {
		const timeZoneData: Record<string, Country> = getAllCountries();

		if (code in timeZoneData) {
			return {
				countryCode: code,
				timeZones: timeZoneData[code].timezones,
			};
		} else {
			log.warn(`No time zone information found for country code: ${code}`);
			return {
				countryCode: code,
				timeZones: missingTimeZones[code],
			};
		}
	});

	return data;
};
