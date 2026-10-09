import * as path from "node:path";
import {
	COUNTRY_DATASET_JSON_FILENAME,
	COUNTRY_DATASET_TS_FILENAME,
} from "./constants";
import { readFile, writeFile } from "./utils/fileOperations";

export const generateCountrySourceTsFile = () => {
	const data = JSON.parse(
		readFile(path.join(__dirname, "./data/", COUNTRY_DATASET_JSON_FILENAME)),
	);

	const codes = Object.keys(data).sort();

	const fileContent = `
  import type { CountrySource } from '../types/countrySource';

  /** ISO 3166-1 alpha-2 codes of every country in the dataset. */
  export const COUNTRY_CODES = ${JSON.stringify(codes)} as const;

  export type CountryCode = (typeof COUNTRY_CODES)[number];

  export const countriesWithRegionalInfo: Record<string, CountrySource> =  ${JSON.stringify(data, null, 2)}
  `;

	writeFile(
		path.join(__dirname, "../generated/", COUNTRY_DATASET_TS_FILENAME),
		fileContent,
	);
};

generateCountrySourceTsFile();
