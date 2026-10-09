import { isValid, toAlpha2 } from "i18n-iso-countries/index.js";
import type { CountryInfoService } from "../types/countryInfoSerive";
import { iso2CodeService } from "./iso2CodeCountryInfoService";

class NumericCodeCountryInfoService implements CountryInfoService {
	private getIso2CodeFromNumericCode = (numericCode: string) => {
		if (!isValid(numericCode)) {
			throw new Error(`Numeric Code: ${numericCode} is not valid`);
		}

		const iso2Code = toAlpha2(numericCode);

		if (iso2Code) {
			return iso2Code;
		} else {
			throw new Error(`Iso-2 code can not be found for: ${numericCode}`);
		}
	};
	getCountryLocationInfo = (numericCode: string) => {
		const iso2Code = this.getIso2CodeFromNumericCode(numericCode);

		return iso2CodeService.getCountryLocationInfo(iso2Code);
	};

	getCountryCurrencyInfo = (numericCode: string) => {
		const iso2Code = this.getIso2CodeFromNumericCode(numericCode);

		return iso2CodeService.getCountryCurrencyInfo(iso2Code);
	};

	getCountryGeneralInfo = (numericCode: string) => {
		const iso2Code = this.getIso2CodeFromNumericCode(numericCode);

		return iso2CodeService.getCountryGeneralInfo(iso2Code);
	};

	getCountryDetailInfo = (numericCode: string) => {
		const iso2Code = this.getIso2CodeFromNumericCode(numericCode);

		return iso2CodeService.getCountryDetailInfo(iso2Code);
	};
}

export const numericCodeService = new NumericCodeCountryInfoService();
