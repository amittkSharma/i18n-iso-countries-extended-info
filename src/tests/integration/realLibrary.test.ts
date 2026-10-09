// Runs against the real i18n-iso-countries (jest.setup.js mocks it for unit tests).
// The `index` entry registers no locales, so these tests fail if the package
// stops registering "en" itself.
jest.unmock("i18n-iso-countries/index.js");

import {
	getAllCountriesAlphaCodes,
	getCountryAlphaCodeByName,
	getCountryDetailInformationByAlpha2Code,
	getCountryDetailInformationByName,
	getCountryDetailInformationByNumericCode,
} from "../../countryIsoInformationService";

describe("integration with the real i18n-iso-countries", () => {
	it("resolves names without the consumer registering a locale", () => {
		expect(getCountryAlphaCodeByName("Germany", "both")).toBe("DE, DEU");
		expect(getCountryDetailInformationByName("india")?.capital).toBe(
			"New Delhi",
		);
	});

	it("returns real country names for every alpha-2 code", () => {
		const all = getAllCountriesAlphaCodes("Alpha-2");
		expect(all.length).toBeGreaterThan(240);
		expect(all.every((c) => c.countryName)).toBe(true);
	});

	it("resolves alpha-2 and numeric codes to the same country", () => {
		expect(getCountryDetailInformationByNumericCode("356")).toEqual(
			getCountryDetailInformationByAlpha2Code("IN"),
		);
	});
});
