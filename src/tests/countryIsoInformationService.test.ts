import { isCountryIsoOrNumericCodeValid } from "../countryIsoInformationService";

describe("country iso information service ", () => {
	describe("country validation", () => {
		it("country Iso-2 code is valid", () => {
			const iso2CodesForIndia = ["IN", "in"];

			iso2CodesForIndia.forEach((iso2Code) => {
				const result = isCountryIsoOrNumericCodeValid(iso2Code);
				expect(result).toBeDefined();
				expect(result).toBe(true);
			});
		});

		it("country Iso-3 code is valid", () => {
			const iso3CodesForIndia = ["IND", "ind"];

			iso3CodesForIndia.forEach((iso3Code) => {
				const result = isCountryIsoOrNumericCodeValid(iso3Code);
				expect(result).toBeDefined();
				expect(result).toBe(true);
			});
		});

		it("country numeric code is valid", () => {
			const numericCodesForIndia = ["356"];

			numericCodesForIndia.forEach((numericCode) => {
				const result = isCountryIsoOrNumericCodeValid(numericCode);
				expect(result).toBeDefined();
				expect(result).toBe(true);
			});
		});

		it("invalid country code is provided", () => {
			const invalidCodesForIndia = ["invalidCode"];

			invalidCodesForIndia.forEach((invalidCode) => {
				expect(() => {
					isCountryIsoOrNumericCodeValid(invalidCode);
				}).toThrow(`Iso Code/Numeric Code: ${invalidCode} is not valid`);
			});
		});
	});
});
