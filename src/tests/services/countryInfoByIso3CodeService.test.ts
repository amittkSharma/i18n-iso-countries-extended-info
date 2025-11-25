import { iso3CodeService } from "../../services";
import type {
	CountryDetailInformation,
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "../../types/detailedCountryInformation";

describe("country information by iso-3 code service", () => {
	describe("country location info by iso-3 code", () => {
		it("get country location information successfully for correct country iso-3 code", () => {
			const iso3CodesForIndia = ["IND", "ind"];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: undefined,
			};

			iso3CodesForIndia.forEach((iso3CodeForIndia) => {
				const locationInfo =
					iso3CodeService.getCountryLocationInfo(iso3CodeForIndia);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-3 code", () => {
			const inValidIso3CodesLengthForIndia = ["IN", "in"];

			inValidIso3CodesLengthForIndia.forEach(
				(inValidIso3CodeLengthForIndia) => {
					expect(() => {
						iso3CodeService.getCountryLocationInfo(
							inValidIso3CodeLengthForIndia,
						);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-3 code", () => {
			const inValidIso2CodesForIndia = ["XX"];

			inValidIso2CodesForIndia.forEach((inValidIso2CodeForIndia) => {
				expect(() => {
					iso3CodeService.getCountryLocationInfo(inValidIso2CodeForIndia);
				}).toThrow(
					"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
				);
			});
		});
	});

	describe("country currency info by iso-3 code", () => {
		it("get country currency information successfully for correct country iso-3 code", () => {
			const iso3CodesForIndia = ["IND", "ind"];
			const expectedCurrencyInfo: CurrencyInfo = {
				currency: "INR",
				currencyName: "Indian rupee",
				symbol: "₹",
			};

			iso3CodesForIndia.forEach((iso3CodeForIndia) => {
				const currencyInfo =
					iso3CodeService.getCountryCurrencyInfo(iso3CodeForIndia);

				expect(currencyInfo).toBeDefined();
				expect(currencyInfo).toEqual(expectedCurrencyInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-3 code", () => {
			const inValidIso3CodesLengthForIndia = ["IN", "in"];

			inValidIso3CodesLengthForIndia.forEach(
				(inValidIso3CodeLengthForIndia) => {
					expect(() => {
						iso3CodeService.getCountryCurrencyInfo(
							inValidIso3CodeLengthForIndia,
						);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-3 code", () => {
			const inValidIso2CodesForIndia = ["XX"];

			inValidIso2CodesForIndia.forEach((inValidIso2CodeForIndia) => {
				expect(() => {
					iso3CodeService.getCountryCurrencyInfo(inValidIso2CodeForIndia);
				}).toThrow(
					"Iso-code length is not appropriate, ISO-3 code must have length of 3 character",
				);
			});
		});
	});

	describe("country general info by iso-3 code", () => {
		it("get country general information successfully for correct country iso-3 code", () => {
			const iso3CodesForIndia = ["IND", "ind"];
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

			iso3CodesForIndia.forEach((iso3CodeForIndia) => {
				const generalInfo =
					iso3CodeService.getCountryGeneralInfo(iso3CodeForIndia);

				expect(generalInfo).toBeDefined();
				expect(generalInfo).toEqual(expectedGeneralInfo);
			});
		});

		it("error thrown successfully for incorrect length country iso-3 code", () => {
			const inValidIso3CodesLengthForIndia = ["IN", "in"];

			inValidIso3CodesLengthForIndia.forEach(
				(inValidIso3CodeLengthForIndia) => {
					expect(() => {
						iso3CodeService.getCountryGeneralInfo(
							inValidIso3CodeLengthForIndia,
						);
					}).toThrow(
						"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
					);
				},
			);
		});

		it("error thrown successfully for invalid length country iso-3 code", () => {
			const inValidIso3CodesForIndia = ["XXC"];

			inValidIso3CodesForIndia.forEach((inValidIso3CodeForIndia) => {
				expect(() => {
					iso3CodeService.getCountryGeneralInfo(inValidIso3CodeForIndia);
				}).toThrow(
					`Iso-2 code can not be found for: ${inValidIso3CodeForIndia}`,
				);
			});
		});
	});

	describe("country detail  info by iso-3 code", () => {
		it("get country detail information successfully for correct country iso-3 code", () => {
			const iso3CodesForIndia = ["IND", "ind"];
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

			iso3CodesForIndia.forEach((iso3CodeForIndia) => {
				const detailInfo =
					iso3CodeService.getCountryDetailInfo(iso3CodeForIndia);

				expect(detailInfo).toBeDefined();
				expect(detailInfo).toEqual(expectedDetailInfo);
			});
		});
	});
});
