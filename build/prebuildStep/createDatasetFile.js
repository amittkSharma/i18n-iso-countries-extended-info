"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCountrySourceTsFile = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("node:path"));
const constants_1 = require("./constants");
const fileOperations_1 = require("./utils/fileOperations");
const generateCountrySourceTsFile = () => {
    const data = JSON.parse((0, fileOperations_1.readFile)(path.join(__dirname, "./data/", constants_1.COUNTRY_DATASET_JSON_FILENAME)));
    const fileContent = `
  import type { CountrySource } from '../types/countrySource';

  export const countriesWithRegionalInfo: Record<string, CountrySource> =  ${JSON.stringify(data, null, 2)}
  `;
    (0, fileOperations_1.writeFile)(path.join(__dirname, "../generated/", constants_1.COUNTRY_DATASET_TS_FILENAME), fileContent);
};
exports.generateCountrySourceTsFile = generateCountrySourceTsFile;
(0, exports.generateCountrySourceTsFile)();
