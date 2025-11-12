import { getAlpha2Codes } from "i18n-iso-countries";
import { currenciesInfo } from "./countryData/currencyInformation";
import { log } from "./devUtils/logger";

const validateDataSources = () => {
	const countries = Object.keys(getAlpha2Codes());
	const currencies = Object.keys(currenciesInfo);

	const missing = countries.filter((item) => currencies.indexOf(item) < 0);

	if (missing && missing.length !== 0) {
		log.error(
			`Data is out of sync, missing currencies are ${missing.join(", ")}`,
		);
	} else {
		log.info(`Data is completely synced`);
	}
};

validateDataSources();
