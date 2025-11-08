export interface DetailedCountryInformation {
	countryName: string;
	iso2Code: string;
	iso3Code: string;
	numericCode?: number;
	currency?: string | undefined;
	symbol?: string | undefined;
	dateFormat?: string | undefined;
}

export interface CountryIsoCodePreview {
	countryName?: string;
	code: string;
}
