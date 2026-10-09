import { countriesWithRegionalInfo } from "../../generated/countryDataSet";
import { getUtcOffset } from "../../index";

const JAN = new Date("2026-01-15T12:00:00Z");
const JUL = new Date("2026-07-15T12:00:00Z");

describe("getUtcOffset", () => {
	it("reads the offset of a single-zone country", () => {
		expect(getUtcOffset("IN", { date: JAN })).toEqual({
			timeZone: "Asia/Kolkata",
			utcOffset: 330,
			utcOffsetStr: "+05:30",
		});
		expect(getUtcOffset("IN", { date: JUL }).utcOffset).toBe(330);
	});

	it("follows daylight saving in both hemispheres", () => {
		expect(getUtcOffset("DE", { date: JAN }).utcOffsetStr).toBe("+01:00");
		expect(getUtcOffset("DE", { date: JUL }).utcOffsetStr).toBe("+02:00");
		expect(
			getUtcOffset("AU", { timeZone: "Australia/Sydney", date: JAN })
				.utcOffsetStr,
		).toBe("+11:00");
		expect(
			getUtcOffset("AU", { timeZone: "Australia/Sydney", date: JUL })
				.utcOffsetStr,
		).toBe("+10:00");
	});

	it("handles zero, negative and non-hour offsets", () => {
		expect(getUtcOffset("GB", { date: JAN })).toMatchObject({
			utcOffset: 0,
			utcOffsetStr: "+00:00",
		});
		expect(getUtcOffset("GB", { date: JUL })).toMatchObject({
			utcOffset: 60,
			utcOffsetStr: "+01:00",
		});
		expect(getUtcOffset("NP", { date: JAN })).toMatchObject({
			utcOffset: 345,
			utcOffsetStr: "+05:45",
		});
		expect(
			getUtcOffset("CA", { timeZone: "America/St_Johns", date: JAN }),
		).toMatchObject({ utcOffset: -210, utcOffsetStr: "-03:30" });
		expect(
			getUtcOffset("CA", { timeZone: "America/St_Johns", date: JUL }),
		).toMatchObject({ utcOffset: -150, utcOffsetStr: "-02:30" });
		expect(
			getUtcOffset("NZ", { timeZone: "Pacific/Chatham", date: JAN }),
		).toMatchObject({ utcOffset: 825, utcOffsetStr: "+13:45" });
		expect(
			getUtcOffset("US", { timeZone: "America/New_York", date: JAN }),
		).toMatchObject({ utcOffset: -300, utcOffsetStr: "-05:00" });
	});

	it("accepts any kind of country key", () => {
		for (const key of ["DE", "de", "DEU", 276, "276", "Germany", " germany "]) {
			expect(getUtcOffset(key, { date: JUL }).utcOffset).toBe(120);
		}
	});

	it("does not guess among zones that agree (Germany has Berlin and Büsingen)", () => {
		expect(countriesWithRegionalInfo.DE.timeZones.length).toBeGreaterThan(1);
		expect(getUtcOffset("DE", { date: JAN }).timeZone).toBe("Europe/Berlin");
	});

	it("refuses to guess when a country's zones disagree", () => {
		for (const country of ["US", "RU", "BR", "AU", "CA", "MX", "ID"]) {
			expect(() => getUtcOffset(country, { date: JAN })).toThrow(
				/several UTC offsets.*pass \{ timeZone \}/,
			);
		}
		expect(() => getUtcOffset("US", { date: JAN })).toThrow("America/New_York");
	});

	it("lets the caller pick a zone, ignoring case and spaces", () => {
		expect(
			getUtcOffset("US", { timeZone: " america/new_york ", date: JUL }),
		).toEqual({
			timeZone: "America/New_York",
			utcOffset: -240,
			utcOffsetStr: "-04:00",
		});
	});

	it("rejects zones the country does not use, including aliases", () => {
		expect(() => getUtcOffset("DE", { timeZone: "Asia/Kolkata" })).toThrow(
			'Time zone "Asia/Kolkata" is not used by DE',
		);
		expect(() => getUtcOffset("IN", { timeZone: "Asia/Calcutta" })).toThrow(
			"not used by IN",
		);
		expect(() => getUtcOffset("IN", { timeZone: "" })).toThrow(
			"not used by IN",
		);
	});

	it("uses the current time by default", () => {
		jest.useFakeTimers().setSystemTime(JUL);
		try {
			expect(getUtcOffset("DE").utcOffset).toBe(120);
			jest.setSystemTime(JAN);
			expect(getUtcOffset("DE").utcOffset).toBe(60);
		} finally {
			jest.useRealTimers();
		}
	});

	it("validates its input", () => {
		for (const date of [
			new Date("nope"),
			"2026-01-15",
			1768478400000,
			null,
			{},
		]) {
			expect(() => getUtcOffset("DE", { date } as never)).toThrow(TypeError);
		}
		for (const timeZone of [5, null, ["Europe/Berlin"]]) {
			expect(() => getUtcOffset("DE", { timeZone } as never)).toThrow(
				TypeError,
			);
		}
		for (const country of ["", "XX", "Atlantis"]) {
			expect(() => getUtcOffset(country)).toThrow("can not be found");
		}
	});

	// Cross-checks the runtime's time zone rules against the dataset's own offsets.
	// A failure means the dataset or the runtime's tz database is out of date.
	it("agrees with the dataset for every zone of every country in winter and summer", () => {
		let checked = 0;
		for (const [code, country] of Object.entries(countriesWithRegionalInfo)) {
			for (const zone of country.timeZones) {
				for (const date of [JAN, JUL]) {
					const { utcOffset } = getUtcOffset(code, {
						timeZone: zone.name,
						date,
					});
					expect([zone.utcOffset, zone.dstOffset]).toContain(utcOffset);
					checked++;
				}
			}
		}
		expect(checked).toBeGreaterThan(800);
	});
});
