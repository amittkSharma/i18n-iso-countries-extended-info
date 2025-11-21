import {
	getCountryCurrencyInfoByIso2Code,
	getCountryDetailInfoByIso2Code,
	getCountryGeneralInfoByIso2Code,
	getCountryLocationInfoByIso2Code,
} from "../../services/countryInfoByIso2CodeService";
import type {
	CountryDetailInformation,
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "../../types/detailedCountryInformation";

describe("country information by iso-2 code service", () => {
	describe("country location info by iso-2 code", () => {
		it("get country location information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: undefined,
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const locationInfo = getCountryLocationInfoByIso2Code(iso2CodeForIndia);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-2 code", () => {
			const inValidIso2CodesLengthForIndia = ["INA", "ina"];

			inValidIso2CodesLengthForIndia.forEach(
				(inValidIso2CodeLengthForIndia) => {
					expect(() => {
						getCountryLocationInfoByIso2Code(inValidIso2CodeLengthForIndia);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-2 code", () => {
			const inValidIso2CodesForIndia = ["XX"];

			inValidIso2CodesForIndia.forEach((inValidIso2CodeForIndia) => {
				expect(() => {
					getCountryLocationInfoByIso2Code(inValidIso2CodeForIndia);
				}).toThrow("Iso Code/Numeric Code: XX is not valid");
			});
		});
	});

	describe("country currency info by iso-2 code", () => {
		it("get country currency information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedCurrencyInfo: CurrencyInfo = {
				currency: "INR",
				currencyName: "Indian rupee",
				symbol: "₹",
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const currencyInfo = getCountryCurrencyInfoByIso2Code(iso2CodeForIndia);

				expect(currencyInfo).toBeDefined();
				expect(currencyInfo).toEqual(expectedCurrencyInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-2 code", () => {
			const inValidIso2CodesLengthForIndia = ["INA", "ina"];

			inValidIso2CodesLengthForIndia.forEach(
				(inValidIso2CodeLengthForIndia) => {
					expect(() => {
						getCountryCurrencyInfoByIso2Code(inValidIso2CodeLengthForIndia);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-2 code", () => {
			const inValidIso2CodesForIndia = ["XX"];

			inValidIso2CodesForIndia.forEach((inValidIso2CodeForIndia) => {
				expect(() => {
					getCountryCurrencyInfoByIso2Code(inValidIso2CodeForIndia);
				}).toThrow("Iso Code/Numeric Code: XX is not valid");
			});
		});
	});

	describe("country general info by iso-2 code", () => {
		it("get country general information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedGeneralInfo: CountryInfo = {
				capital: "New Delhi",
				flag: "🇮🇳",
				isdCodes: [91],
				language: {
					code: "hi",
					official: "Hindi",
					others: ["hi", "en"],
				},
				name: "India",
				native: "भारत",
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const generalInfo = getCountryGeneralInfoByIso2Code(iso2CodeForIndia);

				expect(generalInfo).toBeDefined();
				expect(generalInfo).toEqual(expectedGeneralInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-2 code", () => {
			const inValidIso2CodesLengthForIndia = ["INA", "ina"];

			inValidIso2CodesLengthForIndia.forEach(
				(inValidIso2CodeLengthForIndia) => {
					expect(() => {
						getCountryGeneralInfoByIso2Code(inValidIso2CodeLengthForIndia);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-2 code", () => {
			const inValidIso2CodesForIndia = ["XX"];

			inValidIso2CodesForIndia.forEach((inValidIso2CodeForIndia) => {
				expect(() => {
					getCountryGeneralInfoByIso2Code(inValidIso2CodeForIndia);
				}).toThrow("Iso Code/Numeric Code: XX is not valid");
			});
		});
	});

	describe("country detail  info by iso-2 code", () => {
		it("get country detail information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedDetailInfo: CountryDetailInformation = {
				capital: "New Delhi",
				flag: "🇮🇳",
				isdCodes: [91],
				language: {
					code: "hi",
					official: "Hindi",
					others: ["hi", "en"],
				},
				name: "India",
				native: "भारत",
				continent: "AS",
				continents: undefined,
				region: "Asia & Pacific",
				symbol: "₹",
				currency: "INR",
				currencyName: "Indian rupee",
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const detailInfo = getCountryDetailInfoByIso2Code(iso2CodeForIndia);

				expect(detailInfo).toBeDefined();
				expect(detailInfo).toEqual(expectedDetailInfo);
			});
		});
	});
});
