import {
	iso2CodeService,
	iso3CodeService,
	nameService,
	numericCodeService,
} from "./services";

export {
	getAllCountriesWithIsoCodes as getAllCountriesAlphaCodes,
	getCountryIsoCodeByName as getCountryAlphaCodeByName,
} from "./services";

export const {
	getCountryCurrencyInfo: getCountryCurrencyInformationByAlpha2Code,
	getCountryDetailInfo: getCountryDetailInformationByAlpha2Code,
	getCountryGeneralInfo: getCountryGeneralInformationByAlpha2Code,
	getCountryLocationInfo: getCountryLocationInformationByAlpha2Code,
} = iso2CodeService;

export const {
	getCountryCurrencyInfo: getCountryCurrencyInformationByAlpha3Code,
	getCountryDetailInfo: getCountryDetailInformationByAlpha3Code,
	getCountryGeneralInfo: getCountryGeneralInformationByAlpha3Code,
	getCountryLocationInfo: getCountryLocationInformationByAlpha3Code,
} = iso3CodeService;

export const {
	getCountryCurrencyInfo: getCountryCurrencyInformationByName,
	getCountryDetailInfo: getCountryDetailInformationByName,
	getCountryGeneralInfo: getCountryGeneralInformationByName,
	getCountryLocationInfo: getCountryLocationInformationByName,
} = nameService;

export const {
	getCountryCurrencyInfo: getCountryCurrencyInformationByNumericCode,
	getCountryDetailInfo: getCountryDetailInformationByNumericCode,
	getCountryGeneralInfo: getCountryGeneralInformationByNumericCode,
	getCountryLocationInfo: getCountryLocationInformationByNumericCode,
} = numericCodeService;
