import {
	getCountryIsoCodeByName,
	getDetailedCountryInformationByIso2Code,
	getDetailedCountryInformationByIso3Code,
	getDetailedCountryInformationByNumericCode,
	isCountryIsoOrNumericCodeValid,
} from "../i18nIsoCountriesService";
import type { DetailedCountryInformation } from "../types/detailedCountryInformation";

describe("country iso information service ", () => {
	let expectedInfo: DetailedCountryInformation;

	beforeEach(() => {
		expectedInfo = {
			name: "India",
			iso2Code: "IN",
			iso3Code: "IND",
			currency: "INR",
			symbol: "₹",
			currencyName: "Indian rupee",
			// numericCode: 356,
		};
	});
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
			const invalidCodesForIndia = ["XX"];

			invalidCodesForIndia.forEach((invalidCode) => {
				expect(() => {
					isCountryIsoOrNumericCodeValid(invalidCode);
				}).toThrow(`Iso Code/Numeric Code: ${invalidCode} is not valid`);
			});
		});
	});

	describe("get country iso code by name", () => {
		it("get only ISO-2 code for the country name", () => {
			const countryNames = ["India", "india"];
			const indiaIso2Code = "IN";

			countryNames.forEach((name) => {
				const result = getCountryIsoCodeByName(name, "iso-2");

				expect(result).toBeDefined();
				expect(result).toEqual(indiaIso2Code);
			});
		});

		it("get only ISO-3 code for the country name", () => {
			const countryNames = ["India", "india"];
			const indiaIso3Code = "IND";

			countryNames.forEach((name) => {
				const result = getCountryIsoCodeByName(name, "iso-3");

				expect(result).toBeDefined();
				expect(result).toEqual(indiaIso3Code);
			});
		});

		it("get both ISO-2 & ISO-3 codes for the country name", () => {
			const countryNames = ["India", "india"];
			const indiaIso2Code = "IN";
			const indiaIso3Code = "IND";
			const expectedCodes = `${indiaIso2Code}, ${indiaIso3Code}`;

			countryNames.forEach((name) => {
				const result = getCountryIsoCodeByName(name, "both");

				expect(result).toBeDefined();
				expect(result).toEqual(expectedCodes);
			});
		});
	});

	describe("get detailed country information by country ISO-2 code", () => {
		it("get complete information of India by ISO-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];

			iso2CodesForIndia.forEach((iso2Code) => {
				const result = getDetailedCountryInformationByIso2Code(
					iso2Code.toLocaleUpperCase(),
				);
				expect(result).toBeDefined();
				expect(result).toEqual(expectedInfo);
			});
		});
	});

	describe("get detailed country information by country ISO-3 code", () => {
		it("get complete information of India by ISO-3 code", () => {
			const iso3CodesForIndia = ["IND", "ind"];

			iso3CodesForIndia.forEach((iso3Code) => {
				const result = getDetailedCountryInformationByIso3Code(
					iso3Code.toLocaleUpperCase(),
				);
				expect(result).toBeDefined();
				expect(result).toEqual(expectedInfo);
			});
		});
	});

	describe("get detailed country information by country numeric code", () => {
		it("get complete information of India by ISO-3 code", () => {
			const numericCodesForIndia = ["356"];

			numericCodesForIndia.forEach((numericCode) => {
				const result = getDetailedCountryInformationByNumericCode(
					numericCode.toLocaleUpperCase(),
				);

				expect(result).toBeDefined();
				expect(result).toEqual(expectedInfo);
			});
		});
	});
});
