import { getAllIsoCode } from "./getCountryInfo";
import { log } from "./utils/logger";

const launchApp = async () => {
	log.info(`hello world`);

	getAllIsoCode();
};

launchApp();
