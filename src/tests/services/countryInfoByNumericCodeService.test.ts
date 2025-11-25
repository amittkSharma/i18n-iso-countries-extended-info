import { numericCodeService } from "../../services";
import type {
	CountryDetailInformation,
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "../../types/detailedCountryInformation";

describe("country information by numeric code service", () => {
	describe("country location info by numeric code", () => {
		it("get country location information successfully for correct country numeric code", () => {
			const numericCodesForIndia = ["356", 356];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: undefined,
			};

			numericCodesForIndia.forEach((numericCodeForIndia) => {
				const locationInfo = numericCodeService.getCountryLocationInfo(
					numericCodeForIndia.toString(),
				);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		it("error thrown successfully for invalid length country numeric code", () => {
			const inValidNumericCodesForIndia = ["000"];

			inValidNumericCodesForIndia.forEach((inValidNumericCodeForIndia) => {
				expect(() => {
					numericCodeService.getCountryLocationInfo(inValidNumericCodeForIndia);
				}).toThrow(
					`Iso-2 code can not be found for: ${inValidNumericCodeForIndia}`,
				);
			});
		});
	});

	describe("country currency info by numeric code", () => {
		it("get country currency information successfully for correct country numeric code", () => {
			const numericCodesForIndia = ["356", 356];
			const expectedCurrencyInfo: CurrencyInfo = {
				currency: "INR",
				currencyName: "Indian rupee",
				symbol: "₹",
			};

			numericCodesForIndia.forEach((numericCodeForIndia) => {
				const currencyInfo = numericCodeService.getCountryCurrencyInfo(
					numericCodeForIndia.toLocaleString(),
				);

				expect(currencyInfo).toBeDefined();
				expect(currencyInfo).toEqual(expectedCurrencyInfo);
			});
		});

		it("error thrown successfully for invalid length country numeric code", () => {
			const inValidNumericCodesForIndia = ["000"];

			inValidNumericCodesForIndia.forEach((inValidNumericCodeForIndia) => {
				expect(() => {
					numericCodeService.getCountryCurrencyInfo(inValidNumericCodeForIndia);
				}).toThrow(
					`Iso-2 code can not be found for: ${inValidNumericCodeForIndia}`,
				);
			});
		});
	});

	describe("country general info by numeric code", () => {
		it("get country general information successfully for correct country numeric code", () => {
			const numericCodesForIndia = ["356", 356];
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

			numericCodesForIndia.forEach((numericCodeForIndia) => {
				const generalInfo = numericCodeService.getCountryGeneralInfo(
					numericCodeForIndia.toLocaleString(),
				);

				expect(generalInfo).toBeDefined();
				expect(generalInfo).toEqual(expectedGeneralInfo);
			});
		});

		it("error thrown successfully for invalid length country numeric code", () => {
			const inValidNumericCodesForIndia = ["000"];

			inValidNumericCodesForIndia.forEach((inValidNumericCodeForIndia) => {
				expect(() => {
					numericCodeService.getCountryGeneralInfo(inValidNumericCodeForIndia);
				}).toThrow(
					`Iso-2 code can not be found for: ${inValidNumericCodeForIndia}`,
				);
			});
		});
	});

	describe("country detail  info by numeric code", () => {
		it("get country detail information successfully for correct country numeric code", () => {
			const numericCodesForIndia = ["356", 356];
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

			numericCodesForIndia.forEach((numericCodeForIndia) => {
				const detailInfo = numericCodeService.getCountryDetailInfo(
					numericCodeForIndia.toLocaleString(),
				);

				expect(detailInfo).toBeDefined();
				expect(detailInfo).toEqual(expectedDetailInfo);
			});
		});
	});
});
