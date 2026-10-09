import * as api from "../../index";
import {
	COUNTRY_CODES_ALPHA3,
	findCountries,
	getAllCountriesAlphaCodes,
	getCountry,
} from "../../index";

describe("public API", () => {
	it("exposes only the documented functions", () => {
		expect(Object.keys(api).sort()).toEqual([
			"COUNTRY_CODES",
			"COUNTRY_CODES_ALPHA3",
			"findCountries",
			"formatCurrency",
			"getAllCountriesAlphaCodes",
			"getCountry",
			"getUtcOffset",
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
			numeric: "356",
			name: "India",
			native: "भारत",
			capital: "New Delhi",
			flag: "🇮🇳",
			isdCodes: [91],
			callingCodes: ["+91"],
			language: { code: "hi", official: "Hindi", others: ["hi", "en"] },
			continent: "AS",
			continents: undefined,
			region: "Asia & Pacific",
			currency: "INR",
			currencyName: "Indian rupee",
			symbol: "₹",
			domain: ".in",
			domainUnofficial: undefined,
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

	it("exposes the ISO numeric code as a zero-padded string", () => {
		expect(getCountry("AU").numeric).toBe("036");
		expect(getCountry("DE").numeric).toBe("276");
		for (const { code } of getAllCountriesAlphaCodes("Alpha-2")) {
			const country = getCountry(code);
			expect(country.numeric).toMatch(/^\d{3}$/);
			expect(getCountry(country.numeric).iso2).toBe(code);
			expect(getCountry(Number(country.numeric)).iso2).toBe(code);
		}
	});

	it("marks only territories without a TLD in use as unofficial", () => {
		const unofficial = findCountries({})
			.filter((c) => c.domainUnofficial)
			.map((c) => c.iso2);
		expect(unofficial).toEqual(["BV", "EH", "SJ", "UM", "XK"]);
		expect(getCountry("GB").domain).toBe(".uk");
		expect(getCountry("DE").domainUnofficial).toBeUndefined();
	});

	it("formats calling codes for display, splitting shared codes", () => {
		const callingCodes = (code: string) => getCountry(code).callingCodes;

		expect(callingCodes("DE")).toEqual(["+49"]);
		expect(callingCodes("US")).toEqual(["+1"]);
		expect(callingCodes("KZ")).toEqual(["+7"]);
		expect(callingCodes("AG")).toEqual(["+1 268"]);
		expect(callingCodes("DO")).toEqual(["+1 809", "+1 829", "+1 849"]);
		expect(callingCodes("SJ")).toEqual(["+47 79"]);
		expect(callingCodes("BQ")).toEqual(["+599 7"]);
		expect(callingCodes("CW")).toEqual(["+599 9"]);

		for (const { code } of getAllCountriesAlphaCodes("Alpha-2")) {
			const country = getCountry(code);
			expect(country.callingCodes).toHaveLength(country.isdCodes.length);
			country.callingCodes.forEach((formatted, i) => {
				expect(formatted).toMatch(/^\+\d{1,3}( \d{1,3})?$/);
				expect(formatted.replace(/\D/g, "")).toBe(String(country.isdCodes[i]));
			});
		}
	});

	it("has ISO-3 codes that match the generated list", () => {
		const iso3 = getAllCountriesAlphaCodes("Alpha-2").map(
			({ code }) => getCountry(code).iso3,
		);
		expect([...iso3].sort()).toEqual([...COUNTRY_CODES_ALPHA3]);
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

describe("localized names", () => {
	it("returns names in the requested language and leaves everything else alone", () => {
		const english = getCountry("DE");
		const french = getCountry("DE", { locale: "fr" });

		expect(french).toEqual({
			...english,
			name: "Allemagne",
			currencyName: "euro",
			language: { ...english.language, official: "allemand" },
		});
		expect(getCountry("DE", { locale: "de" }).name).toBe("Deutschland");
		expect(getCountry("US", { locale: "ja" }).name).toBe("アメリカ合衆国");
	});

	it("keeps the dataset's English names when no locale is given", () => {
		expect(getCountry("DE").name).toBe("Germany");
		expect(getCountry("DE", {}).name).toBe("Germany");
		expect(getCountry("DE", { locale: undefined }).name).toBe("Germany");
	});

	it("accepts regional and case-variant locales", () => {
		expect(getCountry("DE", { locale: "fr-CA" }).name).toBe("Allemagne");
		expect(getCountry("DE", { locale: "FR" }).name).toBe("Allemagne");
		expect(getCountry("DE", { locale: "zh-Hans" }).name).toBe("德国");
	});

	it("falls back to English for well-formed locales without translations", () => {
		for (const locale of ["xx", "tlh"]) {
			expect(getCountry("DE", { locale })).toEqual(getCountry("DE"));
		}
	});

	it("rejects malformed locales instead of guessing", () => {
		for (const locale of ["", "en_US", "not a locale!", "x"]) {
			expect(() => getCountry("DE", { locale })).toThrow(RangeError);
		}
		for (const locale of [5, null, ["fr"], {}]) {
			expect(() => getCountry("DE", { locale } as never)).toThrow(TypeError);
		}
	});

	it("never adds facts the English record lacks", () => {
		expect(getCountry("BY", { locale: "fr" }).currencyName).toBe("");
		expect(getCountry("CN", { locale: "fr" }).language.official).toBe("");
		expect(getCountry("AQ", { locale: "fr" }).capital).toBe("");
	});

	it("translates every country without errors", () => {
		for (const { code } of getAllCountriesAlphaCodes("Alpha-2")) {
			for (const locale of ["fr", "de", "ja", "ar"]) {
				const c = getCountry(code, { locale });
				expect(c.name.trim()).not.toBe("");
				expect(c.iso2).toBe(code);
			}
		}
	});

	it("does not leak into later lookups", () => {
		getCountry("DE", { locale: "fr" });
		expect(getCountry("DE").name).toBe("Germany");
	});

	it("applies to findCountries", () => {
		expect(findCountries({ callingCode: 49 }, { locale: "fr" })[0].name).toBe(
			"Allemagne",
		);
		expect(findCountries({ callingCode: 49 })[0].name).toBe("Germany");
		expect(() => findCountries({}, { locale: "bad locale" })).toThrow(
			RangeError,
		);
	});

	it("applies to getAllCountriesAlphaCodes for both code types", () => {
		const fr2 = getAllCountriesAlphaCodes("Alpha-2", { locale: "fr" });
		const fr3 = getAllCountriesAlphaCodes("Alpha-3", { locale: "fr" });

		expect(fr2).toContainEqual({ code: "DE", countryName: "Allemagne" });
		expect(fr3).toContainEqual({ code: "DEU", countryName: "Allemagne" });
		expect(fr2).toHaveLength(250);
		expect(fr2.every((c) => c.countryName?.trim())).toBe(true);
		expect(getAllCountriesAlphaCodes("Alpha-2")).toContainEqual({
			code: "DE",
			countryName: "Germany",
		});
		expect(getAllCountriesAlphaCodes("Alpha-2", { locale: "xx" })).toEqual(
			getAllCountriesAlphaCodes("Alpha-2"),
		);
		expect(() => getAllCountriesAlphaCodes("Alpha-2", { locale: "" })).toThrow(
			RangeError,
		);
	});
});
