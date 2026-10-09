import type {
	CountryCode,
	CountryCodeAlpha3,
	CountryDetailInformation,
	CountryInfo,
} from "../index";
import { getCountry } from "../index";

// These assertions are checked by the compiler (ts-jest reports type errors as failures).
describe("public types", () => {
	it("CountryCode only accepts known codes", () => {
		const ok: CountryCode = "DE";
		// @ts-expect-error "XX" is not a country code
		const bad: CountryCode = "XX";
		expect([ok, bad]).toHaveLength(2);
	});

	it("CountryCodeAlpha3 only accepts known ISO-3 codes", () => {
		const ok: CountryCodeAlpha3 = "DEU";
		// @ts-expect-error "DE" is an ISO-2 code
		const bad: CountryCodeAlpha3 = "DE";
		expect([ok, bad]).toHaveLength(2);
	});

	it("getCountry suggests codes but still accepts plain strings and numbers", () => {
		const fromUserInput: string = "zz";
		expect(() => getCountry(fromUserInput)).toThrow();
		expect(getCountry(276).iso2).toBe("DE");
		expect(getCountry("DEU" as CountryCodeAlpha3).iso2).toBe("DE");
	});

	it("always-present fields are required, genuinely optional ones are not", () => {
		// Never called: only the compiler checks it.
		const typeCheck = (detail: CountryDetailInformation, info: CountryInfo) => {
			const name: string = detail.name;
			const zones: unknown[] = detail.timeZones;
			const codes: number[] = detail.isdCodes;
			const languageCode: string = info.language.code;
			// @ts-expect-error dateFormat is missing for most countries
			const dateFormat: string = detail.dateFormat;
			// @ts-expect-error continents is only set for transcontinental countries
			const continents: string[] = detail.continents;
			return [name, zones, codes, languageCode, dateFormat, continents];
		};
		expect(typeCheck).toBeDefined();
	});
});
