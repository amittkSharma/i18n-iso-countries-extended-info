import { countriesWithRegionalInfo } from "../../generated/countryDataSet";
import type { LocationInfo } from "../../types/detailedCountryInformation";

export const getLocationInfoByCountryIso2Code = (
	iso2Code: string,
): LocationInfo | undefined => {
	const code = iso2Code.toLocaleUpperCase();

	const completeInfo =
		code in countriesWithRegionalInfo
			? countriesWithRegionalInfo[code]
			: undefined;
	const locationInfo = completeInfo
		? {
				continent: completeInfo.continent,
				region: completeInfo.region,
				continents: completeInfo.continents,
			}
		: undefined;

	return locationInfo;
};
