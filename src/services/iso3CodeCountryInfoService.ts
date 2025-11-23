import { isValid, toAlpha2 } from "i18n-iso-countries";
import type { CountryInfoService } from "../types/countryInfoSerive";
import { iso2CodeService } from "./iso2CodeCountryInfoService";

class Iso3CodeCountryInfoService implements CountryInfoService {
	private getIso2CodeFromIso3Code = (iso3Code: string) => {
		if (iso3Code.length !== 3) {
			throw new Error(
				"Iso-code length is not appropriate, ISO-3 code must have length of 3 characters",
			);
		}
		if (!isValid(iso3Code)) {
			throw new Error(`Iso-3 Code: ${iso3Code} is not valid`);
		}
		const iso2Code = toAlpha2(iso3Code);

		if (iso2Code) {
			return iso2Code;
		} else {
			throw new Error(`Iso2 code can not be found for: ${iso3Code}`);
		}
	};

	getCountryLocationInfo = (iso3Code: string) => {
		const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);

		return iso2CodeService.getCountryLocationInfo(iso2Code);
	};
	getCountryCurrencyInfo = (iso3Code: string) => {
		const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);

		return iso2CodeService.getCountryCurrencyInfo(iso2Code);
	};
	getCountryGeneralInfo = (iso3Code: string) => {
		const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);

		return iso2CodeService.getCountryGeneralInfo(iso2Code);
	};
	getCountryDetailInfo = (iso3Code: string) => {
		const iso2Code = this.getIso2CodeFromIso3Code(iso3Code);

		return iso2CodeService.getCountryDetailInfo(iso2Code);
	};
}

export const iso3CodeService = new Iso3CodeCountryInfoService();
