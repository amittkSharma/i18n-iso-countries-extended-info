import { countriesWithRegionalInfo } from "../generated/countryDataSet";
import type {
	Country,
	CountryFilter,
	LocaleOptions,
} from "../types/countryApi";
import type { CountrySource } from "../types/countrySource";
import type { ContinentCode } from "../types/detailedCountryInformation";
import { baseCallingCode } from "./callingCodes";
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

const allCallingCodes = [
	...new Set(
		Object.values(countriesWithRegionalInfo).flatMap((c) =>
			c.phone.map(String),
		),
	),
];

/** Digits of a number written as "+49 170 1234567" or "0049 170 1234567"; anything else is not international format. */
const parseInternationalNumber = (value: string): string | undefined => {
	const text = value.trim();
	return /^(?:\+|00)\d[\d\s().-]*$/.test(text)
		? text.replace(/^(?:\+|00)/, "").replace(/[\s().-]/g, "")
		: undefined;
};

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
	phoneNumber: (value) => {
		const digits = parseInternationalNumber(value);
		// The longest calling code that starts the number wins: 1268... is Antigua, not "+1".
		const best = allCallingCodes
			.filter((code) => digits?.startsWith(code))
			.reduce(
				(longest, code) => (code.length > longest.length ? code : longest),
				"",
			);
		return (c) =>
			best !== "" && c.phone.some((phone) => String(phone) === best);
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
