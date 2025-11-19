import { countriesWithRegionalInfo } from "../../generated/countryDataSet";
import type { CurrencyInfo } from "../../types/detailedCountryInformation";

export const getCurrencyInfoByCountryIso2Code = (
	iso2Code: string,
): CurrencyInfo | undefined => {
	const code = iso2Code.toLocaleUpperCase();

	const completeInfo =
		code in countriesWithRegionalInfo
			? countriesWithRegionalInfo[code]
			: undefined;
	const currencyInfo = completeInfo
		? {
				currency: completeInfo?.currency,
				symbol: completeInfo?.symbol,
				currencyName: completeInfo?.currencyName,
			}
		: undefined;

	return currencyInfo;
};
