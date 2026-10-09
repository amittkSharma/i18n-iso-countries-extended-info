jest.unmock("i18n-iso-countries/index.js");

import { getCountry } from "../../countryIsoInformationService";

describe("getCountry", () => {
	it.each(["DE", "de", "DEU", "276", 276, "Germany", " germany "])(
		"resolves %p to Germany with time zones and domain",
		(input) => {
			const c = getCountry(input);
			expect(c).toMatchObject({ iso2: "DE", iso3: "DEU", name: "Germany" });
			expect(c.timeZones?.[0].name).toBe("Europe/Berlin");
			expect(c.domain).toBe(".de");
		},
	);

	it("pads short numeric codes", () => {
		expect(getCountry(36).iso2).toBe("AU");
	});

	it.each(["", "XX", "Atlantis"])("throws for %p", (input) => {
		expect(() => getCountry(input)).toThrow();
	});
});
