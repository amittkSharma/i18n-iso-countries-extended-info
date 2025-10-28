import { getAlpha2Codes } from "i18n-iso-countries";

export const getAllIsoCode = () => {
	const list = getAlpha2Codes();

	// TODO: Compare the iso codes from the country and iso codes in the currency object

	console.log(`List: ${JSON.stringify(Object.keys(list).length, null, 2)}`);
	console.log(`List: ${JSON.stringify(list, null, 2)}`);
};
