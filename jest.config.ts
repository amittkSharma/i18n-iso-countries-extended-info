import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/tests/**/*.test.ts"],
	clearMocks: true,
	collectCoverage: true,
	coverageProvider: "v8",
	coveragePathIgnorePatterns: ["/node_modules/"],
	verbose: true,
};

export default config;
