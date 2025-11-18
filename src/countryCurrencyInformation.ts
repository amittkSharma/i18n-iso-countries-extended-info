import { countriesWithRegionalInfo } from "./generated/countryDataSet";
import type { CurrencyInfo } from "./types/detailedCountryInformation";

export const getCurrencyInformationByCountryIso2Code = (
	iso2Code: string,
): CurrencyInfo => {
	const completeInfo =
		iso2Code in countriesWithRegionalInfo
			? countriesWithRegionalInfo[iso2Code]
			: undefined;
	const currencyInfo: CurrencyInfo = {
		currency: completeInfo?.currency,
		symbol: completeInfo?.symbol,
		currencyName: completeInfo?.currencyName,
	};

	return currencyInfo;
};
