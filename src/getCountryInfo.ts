import { getAlpha2Codes } from "i18n-iso-countries";
import { dataJSON } from "./currency";

export const getAllIsoCode = () => {
	const countries = Object.keys(getAlpha2Codes());
	const currencies = Object.keys(dataJSON);

	console.log(
		`countries: ${JSON.stringify(Object.keys(countries).length, null, 2)}`,
	);
	console.log(
		`currencies: ${JSON.stringify(Object.keys(currencies).length, null, 2)}`,
	);

	const missing = countries.filter((item) => currencies.indexOf(item) < 0);

	console.log(`missing:${JSON.stringify(missing, null, 2)}`);
};
