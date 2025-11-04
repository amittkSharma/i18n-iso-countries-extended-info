/** biome-ignore-all lint/suspicious/noConfusingLabels: off */
jest.mock("i18n-iso-countries", () => {
	return {
		isValid: jest.fn((code) => {
			return code !== "invalidCode";
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
