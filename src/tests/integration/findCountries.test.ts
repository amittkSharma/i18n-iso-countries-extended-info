import { COUNTRY_CODES, findCountries, getCountry } from "../../index";

const codes = (filter: Parameters<typeof findCountries>[0]) =>
	findCountries(filter).map((c) => c.iso2);

describe("findCountries", () => {
	describe("currency", () => {
		it("finds every country using a currency, case-insensitively", () => {
			const eur = codes({ currency: "EUR" });
			expect(eur).toEqual(expect.arrayContaining(["DE", "FR", "IT", "ES"]));
			expect(eur).not.toContain("GB");
			expect(eur).not.toContain("US");
			expect(codes({ currency: " eur " })).toEqual(eur);
			expect(
				findCountries({ currency: "EUR" }).every((c) => c.currency === "EUR"),
			).toBe(true);
		});
		it("returns [] for unknown or empty values", () => {
			expect(codes({ currency: "ZZZ" })).toEqual([]);
			expect(codes({ currency: "" })).toEqual([]);
		});
	});

	describe("callingCode", () => {
		it("accepts numbers, strings and a leading +", () => {
			expect(codes({ callingCode: 91 })).toEqual(["IN"]);
			expect(codes({ callingCode: "91" })).toEqual(["IN"]);
			expect(codes({ callingCode: "+91" })).toEqual(["IN"]);
			expect(codes({ callingCode: " +91 " })).toEqual(["IN"]);
		});
		it("matches a code shared by several countries", () => {
			expect(codes({ callingCode: 44 })).toEqual(["GB", "GG", "IM", "JE"]);
			expect(codes({ callingCode: 7 })).toEqual(["KZ", "RU"]);
		});
		it("treats +1 as the whole North American plan, including area-code entries", () => {
			const nanp = codes({ callingCode: 1 });
			expect(nanp).toEqual(
				expect.arrayContaining([
					"US",
					"CA",
					"UM",
					"AG",
					"DO",
					"JM",
					"PR",
					"VI",
				]),
			);
			expect(nanp).not.toContain("GB");
			expect(nanp).not.toContain("IN");
		});
		it("matches a full area-code entry exactly", () => {
			expect(codes({ callingCode: 1268 })).toEqual(["AG"]);
			expect(codes({ callingCode: "+1 268" })).toEqual(["AG"]);
			expect(codes({ callingCode: "+1-268" })).toEqual(["AG"]);
			expect(codes({ callingCode: "1 (809)" })).toEqual(["DO"]);
			expect(codes({ callingCode: 1829 })).toEqual(["DO"]);
		});
		it("expands the other shared families (+47 Svalbard, +599)", () => {
			expect(codes({ callingCode: 47 })).toEqual(["BV", "NO", "SJ"]);
			expect(codes({ callingCode: 4779 })).toEqual(["SJ"]);
			expect(codes({ callingCode: 599 })).toEqual(["BQ", "CW"]);
			expect(codes({ callingCode: 5997 })).toEqual(["BQ"]);
		});
		it("never matches by digit prefix alone", () => {
			expect(codes({ callingCode: 4 })).toEqual([]);
			expect(codes({ callingCode: 9 })).toEqual([]);
			expect(codes({ callingCode: 12 })).toEqual([]);
		});
		it("returns [] for malformed numbers instead of guessing", () => {
			for (const callingCode of [
				"",
				"abc",
				"-1",
				"+",
				"0091",
				"91.5",
				"+91x",
				"(+91)",
			]) {
				expect(codes({ callingCode })).toEqual([]);
			}
			for (const callingCode of [-1, 0, 1.5, Number.NaN, 1e21]) {
				expect(codes({ callingCode })).toEqual([]);
			}
		});
	});

	describe("domain", () => {
		it("accepts the TLD with or without a dot in any case", () => {
			for (const domain of [".de", "de", "DE", " .De "]) {
				expect(codes({ domain })).toEqual(["DE"]);
			}
		});
		it("matches territories flagged as having no TLD in use", () => {
			expect(codes({ domain: ".bv" })).toEqual(["BV"]);
			expect(codes({ domain: "xk" })).toEqual(["XK"]);
			expect(findCountries({ domain: "bv" })[0].domainUnofficial).toBe(true);
			expect(codes({ domain: ".bv (unofficial)" })).toEqual([]);
		});
		it("uses .uk, the TLD in actual use, for Great Britain", () => {
			expect(codes({ domain: ".uk" })).toEqual(["GB"]);
			expect(codes({ domain: "UK" })).toEqual(["GB"]);
			expect(codes({ domain: ".gb" })).toEqual([]);
		});
		it("returns [] for unknown TLDs", () => {
			expect(codes({ domain: ".zz" })).toEqual([]);
			expect(codes({ domain: "" })).toEqual([]);
			expect(codes({ domain: "." })).toEqual([]);
		});
	});

	describe("timeZone", () => {
		it("matches IANA names case-insensitively", () => {
			expect(codes({ timeZone: "Asia/Kolkata" })).toEqual(["IN"]);
			expect(codes({ timeZone: "asia/kolkata" })).toEqual(["IN"]);
			expect(codes({ timeZone: "Europe/Berlin" })).toContain("DE");
		});
		it("finds countries with several zones", () => {
			expect(codes({ timeZone: "America/New_York" })).toContain("US");
			expect(codes({ timeZone: "Pacific/Honolulu" })).toContain("US");
		});
		it("does not resolve aliases or accept garbage", () => {
			expect(codes({ timeZone: "Asia/Calcutta" })).toEqual([]);
			expect(codes({ timeZone: "Kolkata" })).toEqual([]);
			expect(codes({ timeZone: "" })).toEqual([]);
		});
	});

	describe("continent", () => {
		it("accepts codes and English names", () => {
			const europe = codes({ continent: "Europe" });
			expect(europe).toEqual(expect.arrayContaining(["DE", "FR"]));
			expect(codes({ continent: "EU" })).toEqual(europe);
			expect(codes({ continent: " europe " })).toEqual(europe);
			expect(codes({ continent: "north america" })).toEqual(
				expect.arrayContaining(["US", "CA"]),
			);
			expect(codes({ continent: "Antarctica" })).toContain("AQ");
		});
		it("includes transcontinental countries under each continent", () => {
			expect(codes({ continent: "Europe" })).toEqual(
				expect.arrayContaining(["RU", "TR"]),
			);
			expect(codes({ continent: "Asia" })).toEqual(
				expect.arrayContaining(["RU", "TR"]),
			);
			expect(codes({ continent: "Africa" })).toContain("EG");
			expect(codes({ continent: "Asia" })).toContain("EG");
		});
		it("returns [] for unknown continents", () => {
			for (const continent of ["America", "Atlantis", "", "E"]) {
				expect(codes({ continent })).toEqual([]);
			}
		});
	});

	describe("language", () => {
		it("matches spoken and official languages", () => {
			expect(codes({ language: "de" })).toEqual(
				expect.arrayContaining(["DE", "AT", "CH"]),
			);
			expect(codes({ language: "DE" })).toEqual(codes({ language: "de" }));
			expect(codes({ language: "mfe" })).toEqual(["MU"]);
		});
		it("matches script variants of the official language code", () => {
			expect(codes({ language: "zh-Hans" })).toEqual(["CN", "SG"]);
			expect(codes({ language: "zh_hans" })).toEqual(["CN", "SG"]);
			expect(codes({ language: "zh" })).toEqual(
				expect.arrayContaining(["CN", "TW", "HK"]),
			);
		});
		it("returns [] for unknown languages", () => {
			expect(codes({ language: "xx" })).toEqual([]);
			expect(codes({ language: "" })).toEqual([]);
		});
	});

	describe("combining filters", () => {
		it("requires every filter to match", () => {
			expect(codes({ currency: "EUR", callingCode: 49 })).toEqual(["DE"]);
			const germanEuro = codes({ currency: "EUR", language: "de" });
			expect(germanEuro).toEqual(expect.arrayContaining(["DE", "AT"]));
			expect(germanEuro).not.toContain("CH");
			expect(codes({ currency: "EUR", continent: "Oceania" })).toEqual([]);
		});
	});

	describe("empty filters and ordering", () => {
		it("returns every country, ordered by ISO-2, for an empty filter", () => {
			expect(codes({})).toEqual([...COUNTRY_CODES]);
			expect(codes({ currency: undefined, domain: undefined })).toEqual([
				...COUNTRY_CODES,
			]);
		});
		it("orders results by ISO-2 code", () => {
			const result = codes({ currency: "EUR" });
			expect(result).toEqual([...result].sort());
		});
	});

	describe("invalid filters", () => {
		it("throws for non-objects", () => {
			for (const filter of [null, undefined, "EUR", 5, ["EUR"]]) {
				expect(() => findCountries(filter as never)).toThrow(TypeError);
			}
		});
		it("throws for unknown keys instead of silently returning everything", () => {
			expect(() => findCountries({ currncy: "EUR" } as never)).toThrow(
				'Unknown filter "currncy"',
			);
			expect(() => findCountries({ toString: "x" } as never)).toThrow(
				"Unknown filter",
			);
		});
		it("throws for values of the wrong type", () => {
			for (const filter of [
				{ currency: 5 },
				{ currency: null },
				{ domain: [".de"] },
				{ callingCode: true },
				{ callingCode: null },
				{ callingCode: {} },
			]) {
				expect(() => findCountries(filter as never)).toThrow(TypeError);
			}
		});
	});

	describe("result records", () => {
		it("are identical to getCountry", () => {
			expect(findCountries({ domain: ".de" })[0]).toEqual(getCountry("DE"));
		});
		it("can be mutated without corrupting later lookups", () => {
			const [india] = findCountries({ domain: "in" });
			india.isdCodes.push(999);
			india.language.others.push("xx");
			india.timeZones[0].name = "Mars/Base";
			india.timeZones.push({
				name: "X/Y",
				utcOffset: 0,
				utcOffsetStr: "",
				dstOffset: 0,
				dstOffsetStr: "",
			});
			const [russia] = findCountries({ domain: "ru" });
			russia.continents?.push("SA");

			const fresh = getCountry("IN");
			expect(fresh.isdCodes).toEqual([91]);
			expect(fresh.language.others).not.toContain("xx");
			expect(fresh.timeZones.map((z) => z.name)).toEqual(["Asia/Kolkata"]);
			expect(getCountry("RU").continents).not.toContain("SA");
			expect(codes({ callingCode: 999 })).toEqual([]);
		});
	});
});
