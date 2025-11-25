import { log } from "./logger";

export const printObj = (obj?: object, message?: string) => {
	log.info(`${message}: ${JSON.stringify(obj, null, 3)}`);
};
