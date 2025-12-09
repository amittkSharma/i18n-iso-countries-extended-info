// biome-ignore assist/source/organizeImports: off
import { getAlpha2Codes } from "i18n-iso-countries";
import fs from "node:fs";
import path from "node:path";
import { log } from "../devUtils/logger";
import { COUNTRY_DATASET_JSON_FILENAME } from "./constants";
import { fetchCountryDomains } from "./fetchCountryDomain";
import { fetchCountryTimeZones } from "./fetchCountryTimeZones";
import { currenciesInfo } from "./rawCountryData/currencyInformation";
import { countriesData } from "./rawCountryData/flagInformation";
import { countriesWithRegionalInfo } from "./rawCountryData/regionalInformation";

import type {
	CountryDomainInfo,
	CountryTimeZoneInfo,
} from "./types/countryCurrencyInfo";

const validateCurrencyDetails = (countries: Array<string>) => {
	log.info(`Validating Currency Data Sync`);

	const currencies = Object.keys(currenciesInfo);

	const missing = countries.filter((item) => currencies.indexOf(item) < 0);

	if (missing && missing.length !== 0) {
		log.error(
			`Data is out of sync, missing currencies are ${missing.join(", ")}`,
		);
		return false;
	} else {
		log.info(`Currency Data is completely synced`);
		return true;
	}
};

const validateCountryCapital = (countries: Array<string>) => {
	log.info(`Validating Capitals Data Sync`);

	const countriesRegionalInfo = Object.keys(countriesWithRegionalInfo);

	const missingInfos = countries.filter(
		(item) => countriesRegionalInfo.indexOf(item) < 0,
	);

	if (missingInfos && missingInfos.length !== 0) {
		log.error(
			`Data is out of sync, missing information are ${missingInfos.join(", ")}`,
		);

		return false;
	} else {
		log.info(`Capitals Data is completely synced`);

		return true;
	}
};

const validateFlagInformation = (countries: Array<string>) => {
	log.info(`Validating Flags Data Sync`);

	const countriesRegionalInfo = countriesData.map((c) => c.countryCode);

	const missingInfos = countries.filter(
		(item) => countriesRegionalInfo.indexOf(item) < 0,
	);

	if (missingInfos && missingInfos.length !== 0) {
		log.error(
			`Data is out of sync, missing information are ${missingInfos.join(", ")}`,
		);

		return false;
	} else {
		log.info(`Capitals Data is completely synced`);

		return true;
	}
};

const validateTimeZoneInformation = (
	countries: Array<string>,
	timeZones: Array<CountryTimeZoneInfo>,
) => {
	log.info(`Validating TimeZone Sync`);

	const countriesRegionalInfo = timeZones.map((c) => c.countryCode);

	const missingInfos = countries.filter(
		(item) => countriesRegionalInfo.indexOf(item) < 0,
	);

	if (missingInfos && missingInfos.length !== 0) {
		log.error(
			`Data is out of sync, missing information are ${missingInfos.join(", ")}`,
		);

		return false;
	} else {
		log.info(`TimeZone Data is completely synced`);

		return true;
	}
};

const generateCountrySourceFile = (
	countries: Array<string>,
	domains: Array<CountryDomainInfo>,
	timeZones: Array<CountryTimeZoneInfo>,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: off
	const merged: any = {};
	countries.sort().forEach((alpha2Code) => {
		const regionalInfo = countriesWithRegionalInfo[alpha2Code];
		const currency = currenciesInfo[alpha2Code];

		const data = countriesData.find((data) => data.countryCode === alpha2Code);

		merged[alpha2Code] = {
			...regionalInfo,
			...currency,
			currencyName: data ? data.currencyNameEn : undefined,
			region: data ? data.region : undefined,
			flag: data ? data.flag : undefined,
			officialLanguageCode: data ? data.officialLanguageCode : undefined,
			officialLanguageName: data ? data.officialLanguageNameEn : undefined,
			timeZones: timeZones.find((d) => d.countryCode === alpha2Code)?.timeZones,
			domain: domains.find((d) => d.countryCode === alpha2Code)?.domain,
		};

		merged[alpha2Code] = {
			...merged[alpha2Code],
			countryName: undefined,
		};
	});

	fs.writeFileSync(
		path.join(__dirname, "/data/", COUNTRY_DATASET_JSON_FILENAME),
		JSON.stringify(merged, null, 2),
	);
};

export const validateDataSources = () => {
	const countriesIsoCodes = Object.keys(getAlpha2Codes());

	const timeZones = fetchCountryTimeZones(countriesIsoCodes);
	const domains = fetchCountryDomains(countriesIsoCodes);

	const res1 = validateCurrencyDetails(countriesIsoCodes);
	const res2 = validateCountryCapital(countriesIsoCodes);
	const res3 = validateFlagInformation(countriesIsoCodes);
	const res4 = validateTimeZoneInformation(countriesIsoCodes, timeZones);

	if (res1 && res2 && res3 && res4) {
		generateCountrySourceFile(countriesIsoCodes, domains, timeZones);
	} else {
		throw new Error("Country Source file can not be generated");
	}
};

validateDataSources();
