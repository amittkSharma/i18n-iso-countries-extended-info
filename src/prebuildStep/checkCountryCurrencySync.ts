// biome-ignore assist/source/organizeImports: off
import { getAlpha2Codes } from "i18n-iso-countries";
import fs from "node:fs";
import path from "node:path";
import { log } from "../devUtils/logger";
import { COUNTRY_DATASET_JSON_FILENAME } from "./constants";
import { currenciesInfo } from "./rawCountryData/currencyInformation";
import { countriesData } from "./rawCountryData/flagInformation";
import { countriesWithRegionalInfo } from "./rawCountryData/regionalInformation";
import { timeZoneInformation } from "./rawCountryData/timeZoneInformation";

const validateCurrencyDetails = () => {
	log.info(`Validating Currency Data Sync`);
	const countries = Object.keys(getAlpha2Codes());
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

const validateCountryCapital = () => {
	log.info(`Validating Capitals Data Sync`);

	const countries = Object.keys(getAlpha2Codes());
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

const validateFlagInformation = () => {
	log.info(`Validating Flags Data Sync`);

	const countries = Object.keys(getAlpha2Codes());
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

const validateTimeZoneInformation = () => {
	log.info(`Validating TimeZone Sync`);

	const countries = Object.keys(getAlpha2Codes());
	const countriesRegionalInfo = Object.keys(timeZoneInformation);

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

const generateCountrySourceFile = () => {
	// biome-ignore lint/suspicious/noExplicitAny: off
	const merged: any = {};
	Object.keys(getAlpha2Codes())
		.sort()
		.forEach((alpha2Code) => {
			const regionalInfo = countriesWithRegionalInfo[alpha2Code];
			const currency = currenciesInfo[alpha2Code];
			const timeZone = timeZoneInformation[alpha2Code];

			const data = countriesData.find(
				(data) => data.countryCode === alpha2Code,
			);

			merged[alpha2Code] = {
				...regionalInfo,
				...currency,
				currencyName: data ? data.currencyNameEn : undefined,
				region: data ? data.region : undefined,
				flag: data ? data.flag : undefined,
				officialLanguageCode: data ? data.officialLanguageCode : undefined,
				officialLanguageName: data ? data.officialLanguageNameEn : undefined,
				timeZones: timeZone ? timeZone.timezones : undefined,
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
	const res1 = validateCurrencyDetails();
	const res2 = validateCountryCapital();
	const res3 = validateFlagInformation();
	const res4 = validateTimeZoneInformation();

	if (res1 && res2 && res3 && res4) {
		generateCountrySourceFile();
	} else {
		throw new Error("Country Source file can not be generated");
	}
};

validateDataSources();
