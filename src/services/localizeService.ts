import type { Country, LocaleOptions } from "../types/countryApi";

/** Returns the canonical locale when Intl has translations for it, `undefined` to keep English. */
const resolveDisplayLocale = (locale: unknown): string | undefined => {
	if (locale === undefined) {
		return undefined;
	}
	if (typeof locale !== "string") {
		throw new TypeError("locale must be a string, e.g. 'fr'");
	}
	let canonical: string;
	try {
		[canonical] = Intl.getCanonicalLocales(locale);
	} catch {
		throw new RangeError(`Invalid locale: "${locale}"`);
	}
	// Without this check Intl would silently use the machine's own locale.
	return Intl.DisplayNames.supportedLocalesOf([canonical]).length > 0
		? canonical
		: undefined;
};

const displayNames = (locale: string, type: Intl.DisplayNamesType) => {
	const names = new Intl.DisplayNames(locale, { type, fallback: "none" });
	return (code: string): string | undefined => {
		try {
			return names.of(code);
		} catch {
			return undefined;
		}
	};
};

/** English country name -> name in `locale`, as `(iso2, englishName) => name`. */
export const createRegionNamer = (locale?: string) => {
	const resolved = resolveDisplayLocale(locale);
	const region = resolved ? displayNames(resolved, "region") : undefined;

	return (iso2: string, englishName: string) => region?.(iso2) || englishName;
};

/** Translates the name fields of a country record; returns it unchanged for no or unsupported locales. */
export const createCountryLocalizer = ({ locale }: LocaleOptions = {}) => {
	const resolved = resolveDisplayLocale(locale);
	if (!resolved) {
		return (country: Country) => country;
	}
	const region = displayNames(resolved, "region");
	const currency = displayNames(resolved, "currency");
	const language = displayNames(resolved, "language");

	// Empty dataset values stay empty so a locale never adds facts the English record lacks.
	return (country: Country): Country => ({
		...country,
		name: region(country.iso2) ?? country.name,
		currencyName:
			country.currencyName &&
			(currency(country.currency) ?? country.currencyName),
		language: {
			...country.language,
			official:
				country.language.official &&
				(language(country.language.code) ?? country.language.official),
		},
	});
};
