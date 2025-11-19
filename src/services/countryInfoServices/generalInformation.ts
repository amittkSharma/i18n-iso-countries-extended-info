import { countriesWithRegionalInfo } from "../../generated/countryDataSet";
import type { CountryInfo } from "../../types/detailedCountryInformation";

export const getInfoByCountryIso2Code = (
	iso2Code: string,
): CountryInfo | undefined => {
	const code = iso2Code.toLocaleUpperCase();

	const completeInfo =
		code in countriesWithRegionalInfo
			? countriesWithRegionalInfo[code]
			: undefined;
	const countryInfo = completeInfo
		? {
				name: completeInfo?.name,
				native: completeInfo?.native,
				capital: completeInfo?.capital,
				flag: completeInfo?.flag,
				isdCodes: completeInfo?.phone,
				language: {
					code: completeInfo?.officialLanguageCode,
					official: completeInfo?.officialLanguageName,
					others: completeInfo?.languages,
				},
			}
		: undefined;

	return countryInfo;
};
