import type {
	CountryDetailInformation,
	CountryInfo,
	CurrencyInfo,
	LocationInfo,
} from "./detailedCountryInformation";

export interface CountryInfoService {
	getCountryLocationInfo: (code: string) => LocationInfo | undefined;

	getCountryCurrencyInfo: (code: string) => CurrencyInfo | undefined;

	getCountryGeneralInfo: (code: string) => CountryInfo | undefined;

	getCountryDetailInfo: (code: string) => CountryDetailInformation | undefined;
}
