// Guards the assumptions the public types and findCountries rely on.
import {
	COUNTRY_CODES,
	countriesWithRegionalInfo,
} from "../generated/countryDataSet";

const entries = Object.entries(countriesWithRegionalInfo);
const CONTINENTS = ["AF", "AN", "AS", "EU", "NA", "OC", "SA"];

describe("country dataset invariants", () => {
	it("COUNTRY_CODES lists every dataset key, sorted", () => {
		expect([...COUNTRY_CODES]).toEqual(
			Object.keys(countriesWithRegionalInfo).sort(),
		);
		expect(COUNTRY_CODES).toHaveLength(250);
		expect(COUNTRY_CODES.every((code) => /^[A-Z]{2}$/.test(code))).toBe(true);
	});

	it.each(entries)(
		"%s has every field the types mark as required",
		(_code, c) => {
			for (const field of [
				"name",
				"native",
				"flag",
				"region",
				"symbol",
				"officialLanguageCode",
				"domain",
			] as const) {
				expect(typeof c[field]).toBe("string");
				expect(c[field].trim()).not.toBe("");
			}
			expect(c.currency).toMatch(/^[A-Z]{3}$/);
			expect(typeof c.capital).toBe("string");
			expect(typeof c.currencyName).toBe("string");
			expect(typeof c.officialLanguageName).toBe("string");
			expect(Array.isArray(c.languages)).toBe(true);
			expect(c.phone.length).toBeGreaterThan(0);
			expect(c.phone.every((p) => Number.isInteger(p) && p > 0)).toBe(true);
			expect(c.timeZones.length).toBeGreaterThan(0);
			expect(
				c.timeZones.every((z) => z.name.includes("/") || z.name === "UTC"),
			).toBe(true);
			expect(CONTINENTS).toContain(c.continent);
			for (const extra of c.continents ?? []) {
				expect(CONTINENTS).toContain(extra);
			}
		},
	);

	it("calling codes longer than 3 digits belong to the known shared families", () => {
		const long = entries
			.flatMap(([, c]) => c.phone.map(String))
			.filter((code) => code.length > 3);

		expect(long.length).toBeGreaterThan(0);
		for (const code of long) {
			expect(code).toMatch(/^(1\d{3}|599\d|47\d{2})$/);
		}
	});

	it("domains are plain two-letter TLDs; only territories without one are flagged", () => {
		for (const [, c] of entries) {
			expect(c.domain).toMatch(/^\.[a-z]{2}$/);
		}
		expect(
			entries.filter(([, c]) => c.domainUnofficial).map(([code]) => code),
		).toEqual(["BV", "EH", "SJ", "UM", "XK"]);
	});
});
