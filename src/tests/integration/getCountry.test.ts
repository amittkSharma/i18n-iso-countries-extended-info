import * as api from "../../index";
import { getAllCountriesAlphaCodes, getCountry } from "../../index";

describe("public API", () => {
	it("exposes only the documented functions", () => {
		expect(Object.keys(api).sort()).toEqual([
			"COUNTRY_CODES",
			"findCountries",
			"formatCurrency",
			"getAllCountriesAlphaCodes",
			"getCountry",
		]);
	});
});

describe("getCountry", () => {
	it.each(["DE", "de", "DEU", "deu", "276", 276, "Germany", " germany "])(
		"resolves %p to Germany with time zones and domain",
		(input) => {
			const c = getCountry(input);
			expect(c).toMatchObject({ iso2: "DE", iso3: "DEU", name: "Germany" });
			expect(c.timeZones[0].name).toBe("Europe/Berlin");
			expect(c.domain).toBe(".de");
		},
	);

	it("returns the full record for India from every kind of key", () => {
		const india = {
			iso2: "IN",
			iso3: "IND",
			name: "India",
			native: "भारत",
			capital: "New Delhi",
			flag: "🇮🇳",
			isdCodes: [91],
			language: { code: "hi", official: "Hindi", others: ["hi", "en"] },
			continent: "AS",
			continents: undefined,
			region: "Asia & Pacific",
			currency: "INR",
			currencyName: "Indian rupee",
			symbol: "₹",
			domain: ".in",
			dateFormat: "d/M/yyyy",
			timeZones: [
				{
					name: "Asia/Kolkata",
					utcOffset: 330,
					utcOffsetStr: "+05:30",
					dstOffset: 330,
					dstOffsetStr: "+05:30",
				},
			],
		};
		for (const key of [
			"IN",
			"in",
			"IND",
			"ind",
			"356",
			356,
			"India",
			"INDIA",
		]) {
			expect(getCountry(key)).toEqual(india);
		}
	});

	it("pads short numeric codes", () => {
		expect(getCountry(36).iso2).toBe("AU");
		expect(getCountry("036").iso2).toBe("AU");
	});

	it("keeps transcontinental countries' extra continents", () => {
		expect(getCountry("RU").continents).toEqual(expect.arrayContaining(["AS"]));
	});

	it.each(["", " ", "XX", "XXX", "999", "35", "Atlantis", "constructor"])(
		"throws for %p",
		(input) => {
			expect(() => getCountry(input)).toThrow("can not be found");
		},
	);

	it("resolves every dataset country from its own ISO-2 and ISO-3 code", () => {
		for (const { code } of getAllCountriesAlphaCodes("Alpha-2")) {
			const country = getCountry(code);
			expect(country.iso2).toBe(code);
			expect(getCountry(country.iso3 as string).iso2).toBe(code);
			expect(getCountry(country.name).iso2).toBe(code);
		}
	});

	it("can be mutated without corrupting later lookups", () => {
		const india = getCountry("IN");
		india.isdCodes.push(999);
		india.timeZones[0].name = "Mars/Base";

		expect(getCountry("IN").isdCodes).toEqual([91]);
		expect(getCountry("IN").timeZones[0].name).toBe("Asia/Kolkata");
	});
});

describe("getAllCountriesAlphaCodes", () => {
	it("lists every country with its English name", () => {
		const alpha2 = getAllCountriesAlphaCodes("Alpha-2");
		const alpha3 = getAllCountriesAlphaCodes("Alpha-3");

		expect(alpha2).toHaveLength(250);
		expect(alpha3).toHaveLength(250);
		expect(alpha2).toContainEqual({ code: "AD", countryName: "Andorra" });
		expect(alpha3).toContainEqual({ code: "AND", countryName: "Andorra" });
		expect(alpha2.every((c) => c.countryName)).toBe(true);
	});

	// The package imports the library's browser entry, which registers no locales.
	// This fails if the package stops registering "en" itself.
	it("returns names without the consumer registering a locale", () => {
		expect(getCountry("germany").name).toBe("Germany");
	});
});
