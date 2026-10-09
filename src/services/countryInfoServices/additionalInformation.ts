import { countriesWithRegionalInfo } from "../../generated/countryDataSet";
import type { Others } from "../../types/detailedCountryInformation";

export const getAdditionalInfoByCountryIso2Code = (
	iso2Code: string,
): Others | undefined => {
	const completeInfo = countriesWithRegionalInfo[iso2Code.toLocaleUpperCase()];

	return completeInfo
		? {
				timeZones: completeInfo.timeZones,
				domain: completeInfo.domain,
				dateFormat: completeInfo.dateFormat,
			}
		: undefined;
};
