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

	const fileContent = `
  import type { CountrySource } from '../types/countrySource';

  export const countriesWithRegionalInfo: Record<string, CountrySource> =  ${JSON.stringify(data, null, 2)}
  `;

	writeFile(
		path.join(__dirname, "../generated/", COUNTRY_DATASET_TS_FILENAME),
		fileContent,
	);
};

generateCountrySourceTsFile();
