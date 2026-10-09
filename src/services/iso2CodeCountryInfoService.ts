import { isValid } from "i18n-iso-countries/index.js";
import type { CountryInfoService } from "../types/countryInfoSerive";
import type { CountryDetailInformation } from "../types/detailedCountryInformation";
import {
	getCurrencyInfoByCountryIso2Code,
	getInfoByCountryIso2Code,
	getLocationInfoByCountryIso2Code,
} from "./countryInfoServices";

class Iso2CodeCountryInfoService implements CountryInfoService {
	private validateIso2Code = (iso2Code: string) => {
		if (iso2Code.length !== 2) {
			throw new Error(
				"Iso-code length is not appropriate, ISO-2 code must have length of 2 characters",
			);
		}
		if (!isValid(iso2Code)) {
			throw new Error(`Iso Code/Numeric Code: ${iso2Code} is not valid`);
		}
	};
	getCountryLocationInfo = (iso2Code: string) => {
		this.validateIso2Code(iso2Code);

		return getLocationInfoByCountryIso2Code(iso2Code);
	};

	getCountryCurrencyInfo = (iso2Code: string) => {
		this.validateIso2Code(iso2Code);

		return getCurrencyInfoByCountryIso2Code(iso2Code);
	};

	getCountryGeneralInfo = (iso2Code: string) => {
		this.validateIso2Code(iso2Code);

		return getInfoByCountryIso2Code(iso2Code);
	};

	getCountryDetailInfo = (iso2Code: string) => {
		this.validateIso2Code(iso2Code);

		const infoRes = getInfoByCountryIso2Code(iso2Code);
		const locRes = getLocationInfoByCountryIso2Code(iso2Code);
		const curRes = getCurrencyInfoByCountryIso2Code(iso2Code);

		const result: CountryDetailInformation | undefined =
			infoRes && locRes && curRes
				? {
						...infoRes,
						...locRes,
						...curRes,
					}
				: undefined;
		return result;
	};
}

export const iso2CodeService = new Iso2CodeCountryInfoService();
