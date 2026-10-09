import { countriesWithRegionalInfo } from "../generated/countryDataSet";
import type { UtcOffset, UtcOffsetOptions } from "../types/countryApi";
import { resolveIso2 } from "./countryService";

const pad = (value: number) => String(value).padStart(2, "0");

// Intl knows the daylight-saving rules; the dataset only has a fixed standard and summer offset per zone.
const offsetAt = (timeZone: string, date: Date): UtcOffset => {
	const label =
		new Intl.DateTimeFormat("en", { timeZone, timeZoneName: "longOffset" })
			.formatToParts(date)
			.find((part) => part.type === "timeZoneName")?.value ?? "";
	const match = /^GMT(?:([+\-−])(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(label);
	if (!match) {
		throw new Error(
			`Could not read the UTC offset of ${timeZone} (got "${label}")`,
		);
	}

	const [, sign, hours = "0", minutes = "0", seconds = "0"] = match;
	// Dates before standard time was introduced can carry seconds; round to the minute.
	const magnitude = Math.round(
		Number(hours) * 60 + Number(minutes) + Number(seconds) / 60,
	);
	const utcOffset = sign === "+" || sign === undefined ? magnitude : -magnitude;
	const abs = Math.abs(utcOffset);

	return {
		timeZone,
		utcOffset,
		utcOffsetStr: `${utcOffset < 0 ? "-" : "+"}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`,
	};
};

const isValidDate = (value: unknown): value is Date =>
	Object.prototype.toString.call(value) === "[object Date]" &&
	!Number.isNaN((value as Date).getTime());

export const getUtcOffset = (
	country: string | number,
	{ timeZone, date = new Date() }: UtcOffsetOptions = {},
): UtcOffset => {
	if (!isValidDate(date)) {
		throw new TypeError("date must be a valid Date");
	}
	if (timeZone !== undefined && typeof timeZone !== "string") {
		throw new TypeError("timeZone must be a string, e.g. 'Europe/Berlin'");
	}

	const iso2 = resolveIso2(country);
	const zones = countriesWithRegionalInfo[iso2].timeZones.map(
		(zone) => zone.name,
	);

	if (timeZone !== undefined) {
		const wanted = timeZone.trim().toLowerCase();
		const zone = zones.find((name) => name.toLowerCase() === wanted);
		if (!zone) {
			throw new Error(
				`Time zone "${timeZone}" is not used by ${iso2}. Available: ${zones.join(", ")}`,
			);
		}
		return offsetAt(zone, date);
	}

	const offsets = zones.map((zone) => offsetAt(zone, date));
	// Several zones are fine while they agree (Germany: Berlin and Büsingen); only a real clash is ambiguous.
	if (offsets.some((offset) => offset.utcOffset !== offsets[0].utcOffset)) {
		throw new Error(
			`${iso2} has several UTC offsets at ${date.toISOString()}; pass { timeZone }. Available: ${zones.join(", ")}`,
		);
	}
	return offsets[0];
};
