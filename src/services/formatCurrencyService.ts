import { countriesWithRegionalInfo } from "../generated/countryDataSet";
import type { FormatCurrencyOptions } from "../types/countryApi";
import { resolveIso2 } from "./countryService";

// Never rely on Intl's silent fallback to the machine's default locale.
const pickLocale = (candidates: string[]) =>
	candidates.find(
		(locale) => Intl.NumberFormat.supportedLocalesOf([locale]).length > 0,
	) ?? "en";

export const formatCurrency = (
	amount: number,
	country: string | number,
	options: FormatCurrencyOptions = {},
): string => {
	if (typeof amount !== "number" || !Number.isFinite(amount)) {
		throw new TypeError(
			`amount must be a finite number, got: ${String(amount)}`,
		);
	}

	const iso2 = resolveIso2(country);
	const { currency, officialLanguageCode } = countriesWithRegionalInfo[iso2];
	const { locale, ...intlOptions } = options;

	return new Intl.NumberFormat(
		locale ??
			pickLocale([`${officialLanguageCode}-${iso2}`, officialLanguageCode]),
		{ ...intlOptions, style: "currency", currency },
	).format(amount);
};
