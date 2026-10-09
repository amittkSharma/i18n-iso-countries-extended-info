import { countriesWithRegionalInfo } from "../generated/countryDataSet";
import type {
	Country,
	CountryFilter,
	LocaleOptions,
} from "../types/countryApi";
import type { CountrySource } from "../types/countrySource";
import type { ContinentCode } from "../types/detailedCountryInformation";
import { getCountryByIso2 } from "./countryService";
import { createCountryLocalizer } from "./localizeService";

type Predicate = (country: CountrySource) => boolean;

const CONTINENT_NAMES: Record<ContinentCode, string> = {
	AF: "africa",
	AN: "antarctica",
	AS: "asia",
	EU: "europe",
	NA: "north america",
	OC: "oceania",
	SA: "south america",
};

const normalize = (value: string) => value.trim().toLowerCase();

// Dataset calling codes longer than 3 digits are a shared code plus extra digits:
// NANP area codes (1268 -> +1), 4779 (+47, Svalbard), 5997/5999 (+599, Caribbean Netherlands).
// The dataset test fails if a new family appears.
const baseCallingCode = (code: string) =>
	code.startsWith("1")
		? "1"
		: code.startsWith("599")
			? "599"
			: code.slice(0, 2);

const parseCallingCode = (value: string | number): string | undefined => {
	if (typeof value === "number") {
		return /^\d+$/.test(String(value)) ? String(value) : undefined;
	}
	const text = value.trim();
	return /^\+?\d[\d\s().-]*$/.test(text)
		? text.replace(/^\+/, "").replace(/[\s().-]/g, "")
		: undefined;
};

const predicateFactories: {
	[K in keyof CountryFilter]-?: (
		value: NonNullable<CountryFilter[K]>,
	) => Predicate;
} = {
	currency: (value) => {
		const currency = normalize(value);
		return (c) => c.currency.toLowerCase() === currency;
	},
	callingCode: (value) => {
		const wanted = parseCallingCode(value);
		return (c) =>
			wanted !== undefined &&
			c.phone.some((phone) => {
				const code = String(phone);
				return (
					code === wanted ||
					(code.length > 3 && baseCallingCode(code) === wanted)
				);
			});
	},
	domain: (value) => {
		const text = normalize(value);
		const domain = text.startsWith(".") ? text : `.${text}`;
		return (c) => c.domain.toLowerCase() === domain;
	},
	timeZone: (value) => {
		const zone = normalize(value);
		return (c) => c.timeZones.some((tz) => tz.name.toLowerCase() === zone);
	},
	continent: (value) => {
		const text = normalize(value);
		const code = (Object.keys(CONTINENT_NAMES) as ContinentCode[]).find(
			(key) => key.toLowerCase() === text || CONTINENT_NAMES[key] === text,
		);
		return (c) =>
			code !== undefined &&
			(c.continent === code || !!c.continents?.includes(code));
	},
	language: (value) => {
		const language = normalize(value).replace(/_/g, "-");
		return (c) =>
			c.officialLanguageCode.toLowerCase() === language ||
			c.languages.some((l) => l.toLowerCase() === language);
	},
};

export const findCountries = (
	filter: CountryFilter,
	options?: LocaleOptions,
): Country[] => {
	if (typeof filter !== "object" || filter === null || Array.isArray(filter)) {
		throw new TypeError("filter must be an object, e.g. { currency: 'EUR' }");
	}

	const predicates: Predicate[] = [];
	for (const [key, value] of Object.entries(filter)) {
		if (!Object.hasOwn(predicateFactories, key)) {
			throw new Error(
				`Unknown filter "${key}". Supported: ${Object.keys(predicateFactories).join(", ")}`,
			);
		}
		if (value === undefined) {
			continue;
		}
		if (
			typeof value !== "string" &&
			!(key === "callingCode" && typeof value === "number")
		) {
			throw new TypeError(`Filter "${key}" must be a string`);
		}
		predicates.push(
			(predicateFactories as Record<string, (v: unknown) => Predicate>)[key](
				value,
			),
		);
	}

	const localize = createCountryLocalizer(options);

	return Object.keys(countriesWithRegionalInfo)
		.filter((code) =>
			predicates.every((matches) => matches(countriesWithRegionalInfo[code])),
		)
		.map((code) => localize(getCountryByIso2(code)));
};
