/** biome-ignore-all lint/suspicious/noConfusingLabels: off */
jest.mock("i18n-iso-countries", () => {
	return {
		isValid: jest.fn((code) => {
			return code !== "XX";
		}),
		getAlpha2Code: jest.fn((countryName) => {
			return countryName.toLowerCase() === "india" ? "IN" : undefined;
		}),
		getAlpha3Code: jest.fn((countryName) => {
			return countryName.toLowerCase() === "india" ? "IND" : undefined;
		}),
		getName: jest.fn(() => {
			return "India";
		}),
		alpha2ToAlpha3: jest.fn((code) => {
			return code.toLowerCase() === "in" ? "IND" : undefined;
		}),
		alpha3ToAlpha2: jest.fn((code) => {
			return code.toLowerCase() === "ind" ? "IN" : undefined;
		}),
		numericToAlpha3: jest.fn((code) => {
			return code.toLowerCase() === "356" ? "IND" : undefined;
		}),
		numericToAlpha2: jest.fn((code) => {
			return code.toLowerCase() === "356" ? "IN" : undefined;
		}),
	};
});

jest.mock("pino-pretty", () => {
	return {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	};
});
