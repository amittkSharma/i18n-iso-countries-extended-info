import {
	type Country,
	getAllCountries,
	getAllTimezones,
	type TimezoneName,
} from "countries-and-timezones";
import { log } from "../devUtils/logger";
import type { CountryTimeZoneInfo } from "./types/countryInfo";

const missingTimeZones: Record<string, TimezoneName[]> = {
	BV: ["Europe/Berlin"],
	HM: ["Indian/Maldives"],
	XK: ["Europe/Berlin", "Europe/Zurich"],
};

export const fetchCountryTimeZones = (countries: Array<string>) => {
	log.info("Fetching Country Time Zone Information");
	const timeZoneData: Record<string, Country> = getAllCountries();
	const completeTimeZoneData = getAllTimezones();

	const data: CountryTimeZoneInfo[] = countries.map((code) => {
		if (code in timeZoneData) {
			return {
				countryCode: code,
				timeZones: timeZoneData[code].timezones.map((tz) => {
					const data = completeTimeZoneData[tz];
					return { ...data, countries: undefined, aliasOf: undefined };
				}),
			};
		} else {
			log.warn(`No time zone information found for country code: ${code}`);
			return {
				countryCode: code,
				timeZones: missingTimeZones[code].map((tz) => {
					const data = completeTimeZoneData[tz];
					return { ...data, countries: undefined, aliasOf: undefined };
				}),
			};
		}
	});

	return data;
};
