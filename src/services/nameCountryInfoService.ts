import { getAlpha2Code } from "i18n-iso-countries/index.js";
import { BASIC_LANGUAGE } from "../constants";
import type { CountryInfoService } from "../types/countryInfoSerive";
import { iso2CodeService } from "./iso2CodeCountryInfoService";

class NameCountryInfoService implements CountryInfoService {
	private getIso2CodeFromName = (name: string) => {
		const iso2Code = getAlpha2Code(name, BASIC_LANGUAGE);

		if (iso2Code) {
			return iso2Code;
		} else {
			throw new Error(`Iso-2 code can not be found for: ${name}`);
		}
	};

	getCountryLocationInfo = (name: string) => {
		const iso2Code = this.getIso2CodeFromName(name);

		return iso2CodeService.getCountryLocationInfo(iso2Code);
	};
	getCountryCurrencyInfo = (name: string) => {
		const iso2Code = this.getIso2CodeFromName(name);

		return iso2CodeService.getCountryCurrencyInfo(iso2Code);
	};
	getCountryGeneralInfo = (name: string) => {
		const iso2Code = this.getIso2CodeFromName(name);

		return iso2CodeService.getCountryGeneralInfo(iso2Code);
	};
	getCountryDetailInfo = (name: string) => {
		const iso2Code = this.getIso2CodeFromName(name);

		return iso2CodeService.getCountryDetailInfo(iso2Code);
	};
}

export const nameService = new NameCountryInfoService();
