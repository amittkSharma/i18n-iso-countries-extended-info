import { nameService } from "../../services";
import type {
	CountryDetailInformation,
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "../../types/detailedCountryInformation";

describe("country information by name service", () => {
	describe("country location info by country name", () => {
		it("get country location information successfully for correct country name", () => {
			const namesIndia = ["INDIA", "india"];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: undefined,
			};

			namesIndia.forEach((nameIndia) => {
				const locationInfo = nameService.getCountryLocationInfo(nameIndia);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		it("error thrown successfully for invalid length country name", () => {
			const inValidNamesForIndia = ["INDIAX", "indiax"];

			inValidNamesForIndia.forEach((inValidNameForIndia) => {
				expect(() => {
					nameService.getCountryLocationInfo(inValidNameForIndia);
				}).toThrow(`Iso-2 code can not be found for: ${inValidNameForIndia}`);
			});
		});
	});

	describe("country currency info by country name", () => {
		it("get country currency information successfully for correct country name", () => {
			const namesForIndia = ["INDIA", "india"];
			const expectedCurrencyInfo: CurrencyInfo = {
				currency: "INR",
				currencyName: "Indian rupee",
				symbol: "₹",
			};

			namesForIndia.forEach((nameForIndia) => {
				const currencyInfo = nameService.getCountryCurrencyInfo(nameForIndia);

				expect(currencyInfo).toBeDefined();
				expect(currencyInfo).toEqual(expectedCurrencyInfo);
			});
		});

		it("error thrown successfully for invalid length country name", () => {
			const inValidNamesForIndia = ["INDIAX", "indiax"];

			inValidNamesForIndia.forEach((inValidNameForIndia) => {
				expect(() => {
					nameService.getCountryCurrencyInfo(inValidNameForIndia);
				}).toThrow(`Iso-2 code can not be found for: ${inValidNameForIndia}`);
			});
		});
	});

	describe("country general info by country name", () => {
		it("get country general information successfully for correct country name", () => {
			const namesForIndia = ["INDIA", "india"];
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

			namesForIndia.forEach((nameForIndia) => {
				const generalInfo = nameService.getCountryGeneralInfo(nameForIndia);

				expect(generalInfo).toBeDefined();
				expect(generalInfo).toEqual(expectedGeneralInfo);
			});
		});

		it("error thrown successfully for invalid length country name", () => {
			const inValidNamesForIndia = ["INDIAX", "indiax"];

			inValidNamesForIndia.forEach((inValidNameForIndia) => {
				expect(() => {
					nameService.getCountryGeneralInfo(inValidNameForIndia);
				}).toThrow(`Iso-2 code can not be found for: ${inValidNameForIndia}`);
			});
		});
	});

	describe("country detail  info by country name", () => {
		it("get country detail information successfully for correct country name", () => {
			const namesForIndia = ["INDIA", "india"];
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
				domain: ".in",
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

			namesForIndia.forEach((nameForIndia) => {
				const detailInfo = nameService.getCountryDetailInfo(nameForIndia);

				expect(detailInfo).toBeDefined();
				expect(detailInfo).toEqual(expectedDetailInfo);
			});
		});
	});
});
