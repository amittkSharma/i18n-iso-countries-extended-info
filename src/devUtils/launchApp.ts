import { findCountries, formatCurrency, getCountry } from "../index";
import { log } from "./logger";
import { printObj } from "./printObject";

const launchApp = () => {
	printObj(getCountry("India"), "Country by name");
	printObj(getCountry("IND"), "Country by ISO-3 code");
	printObj(getCountry(356), "Country by numeric code");
	printObj(
		{ count: findCountries({ currency: "EUR" }).length },
		"Countries using EUR",
	);
	printObj({ formatted: formatCurrency(1234.5, "DE") }, "1234.5 in Germany");

	try {
		getCountry("35");
	} catch (error) {
		log.error(`Error: ${(error as Error).message}`);
	}
};

launchApp();
