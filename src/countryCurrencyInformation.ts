import { currenciesInfo } from "./countryData/currencyInformation";

export const getCurrencyInformationByCountryIso2Code = (iso2Code: string) => {
	return iso2Code in currenciesInfo ? currenciesInfo[iso2Code] : undefined;
};
