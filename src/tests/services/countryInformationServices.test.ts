import {
	getCurrencyInfoByCountryIso2Code,
	getInfoByCountryIso2Code,
	getLocationInfoByCountryIso2Code,
} from "../../services/countryInfoServices";
import type {
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "../../types/detailedCountryInformation";

describe("country information services", () => {
	describe("currency information service", () => {
		test("get currency information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedCurrencyInfo: CurrencyInfo = {
				currency: "INR",
				symbol: "₹",
				currencyName: "Indian rupee",
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const currencyInfo = getCurrencyInfoByCountryIso2Code(iso2CodeForIndia);

				expect(currencyInfo).toBeDefined();
				expect(currencyInfo).toEqual(expectedCurrencyInfo);
			});
		});

		test("get no currency information for in-correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IY", "iy"];

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const currencyInfo = getCurrencyInfoByCountryIso2Code(iso2CodeForIndia);

				expect(currencyInfo).toBeUndefined();
			});
		});
	});

	describe("location information service", () => {
		test("get location information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: undefined,
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const locationInfo = getLocationInfoByCountryIso2Code(iso2CodeForIndia);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		test("get location information successfully for correct country iso-2 code and belongs to two continents", () => {
			const iso2CodesAzerbaijan = ["AZ", "az"];
			const expectedLocationInfo: LocationInfo = {
				continent: "AS",
				region: "Asia & Pacific",
				continents: ["AS", "EU"],
			};

			iso2CodesAzerbaijan.forEach((iso2CodeForAzerbaijan) => {
				const locationInfo = getLocationInfoByCountryIso2Code(
					iso2CodeForAzerbaijan,
				);

				expect(locationInfo).toBeDefined();
				expect(locationInfo).toEqual(expectedLocationInfo);
			});
		});

		test("get no location information for in-correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IY", "iy"];

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const currencyInfo = getLocationInfoByCountryIso2Code(iso2CodeForIndia);

				expect(currencyInfo).toBeUndefined();
			});
		});
	});

	describe("general information service", () => {
		test("get general information successfully for correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IN", "in"];
			const expectedGeneralInfo: CountryInfo = {
				name: "India",
				native: "भारत",
				capital: "New Delhi",
				flag: "🇮🇳",
				isdCodes: [91],
				language: {
					code: "hi",
					official: "Hindi",
					others: ["hi", "en"],
				},
			};

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const generalInfo = getInfoByCountryIso2Code(iso2CodeForIndia);

				expect(generalInfo).toBeDefined();
				expect(generalInfo).toEqual(expectedGeneralInfo);
			});
		});

		test("get no general information for in-correct country iso-2 code", () => {
			const iso2CodesForIndia = ["IY", "iy"];

			iso2CodesForIndia.forEach((iso2CodeForIndia) => {
				const currencyInfo = getInfoByCountryIso2Code(iso2CodeForIndia);

				expect(currencyInfo).toBeUndefined();
			});
		});
	});
});
