import {
	getAllCountriesWithIsoCodes,
	getCountryIsoCodeByName,
	iso2CodeService,
	iso3CodeService,
	nameService,
	numericCodeService,
} from "./services";

/**
 * This function retrieves all countries' ISO codes based on the specified alpha code type.
 * @param alphaCodeType - The type of alpha code ("Alpha-2" or "Alpha-3") to filter the countries by.
 * @returns An array of country ISO code previews corresponding to the specified alpha code type.
 * @example
 * ```ts
 * const alpha2Codes = getAllCountriesAlphaCodes("Alpha-2");
 * const alpha3Codes = getAllCountriesAlphaCodes("Alpha-3");
 * ```
 * @returns An array of country ISO code previews.
 * @defaults "Alpha-2"
 * @throws Will throw an error if the provided alpha code type is invalid.
 */
export const getAllCountriesAlphaCodes = (
	alphaCodeType: "Alpha-2" | "Alpha-3",
) => {
	return getAllCountriesWithIsoCodes(alphaCodeType);
};

/**
 * This function retrieves the ISO code(s) for a given country name based on the specified alpha code type.
 * @param countryName - The name of the country to retrieve the ISO code(s) for.
 * @param alphaCode - The type of alpha code to retrieve ("Alpha-2", "Alpha-3", or "both"). Default is "Alpha-2".
 * @returns The ISO code(s) corresponding to the specified country name and alpha code type.
 * @example
 * ```ts
 * const alpha2Code = getCountryAlphaCodeByName("United States", "Alpha-2");
 * const alpha3Code = getCountryAlphaCodeByName("United States", "Alpha-3");
 * const bothCodes = getCountryAlphaCodeByName("United States", "both");
 * ```
 * @returns The ISO code(s) for the specified country name.
 * @defaults "Alpha-2"
 * @throws Will throw an error if the country name is not found or if the alpha code type is invalid.
 */
export const getCountryAlphaCodeByName = (
	countryName: string,
	alphaCode: "Alpha-2" | "Alpha-3" | "both" = "Alpha-2",
) => {
	return getCountryIsoCodeByName(countryName, alphaCode);
};

/**
 * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByAlpha2Code("US");
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export const getCountryCurrencyInformationByAlpha2Code = (
	alpha2Code: string,
) => {
	return iso2CodeService.getCountryCurrencyInfo(alpha2Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByAlpha2Code("US");
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export const getCountryDetailInformationByAlpha2Code = (alpha2Code: string) => {
	return iso2CodeService.getCountryDetailInfo(alpha2Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByAlpha2Code("US");
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export const getCountryGeneralInformationByAlpha2Code = (
	alpha2Code: string,
) => {
	return iso2CodeService.getCountryGeneralInfo(alpha2Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-2 code identifiers.
 * @param alpha2Code - The Alpha-2 code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByAlpha2Code("US");
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Alpha-2 code is not found.
 */
export const getCountryLocationInformationByAlpha2Code = (
	alpha2Code: string,
) => {
	return iso2CodeService.getCountryLocationInfo(alpha2Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByAlpha3Code("USA");
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export const getCountryCurrencyInformationByAlpha3Code = (
	alpha3Code: string,
) => {
	return iso3CodeService.getCountryCurrencyInfo(alpha3Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByAlpha3Code("USA");
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export const getCountryDetailInformationByAlpha3Code = (alpha3Code: string) => {
	return iso3CodeService.getCountryDetailInfo(alpha3Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByAlpha3Code("USA");
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 */
export const getCountryGeneralInformationByAlpha3Code = (
	alpha3Code: string,
) => {
	return iso3CodeService.getCountryGeneralInfo(alpha3Code);
};

/** * The following functions retrieve various types of country information
 * based on Alpha-3 code identifiers.
 * @param alpha3Code - The Alpha-3 code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByAlpha3Code("USA");
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Alpha-3 code is not found.
 *
 */
export const getCountryLocationInformationByAlpha3Code = (
	alpha3Code: string,
) => {
	return iso3CodeService.getCountryLocationInfo(alpha3Code);
};

/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByName("United States");
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export const getCountryCurrencyInformationByName = (name: string) => {
	return nameService.getCountryCurrencyInfo(name);
};

/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByName("United States");
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export const getCountryDetailInformationByName = (name: string) => {
	return nameService.getCountryDetailInfo(name);
};

/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByName("United States");
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export const getCountryGeneralInformationByName = (name: string) => {
	return nameService.getCountryGeneralInfo(name);
};

/** * The following functions retrieve various types of country information
 * based on country names.
 * @param name - The name of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByName("United States");
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the country name is not found.
 */
export const getCountryLocationInformationByName = (name: string) => {
	return nameService.getCountryLocationInfo(name);
};

/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const currencyInfo = getCountryCurrencyInformationByNumericCode("840");
 * ```
 * @returns Currency information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export const getCountryCurrencyInformationByNumericCode = (
	numericCode: string,
) => {
	return numericCodeService.getCountryCurrencyInfo(numericCode);
};
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const detailInfo = getCountryDetailInformationByNumericCode("840");
 * ```
 * @returns Detailed information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export const getCountryDetailInformationByNumericCode = (
	numericCode: string,
) => {
	return numericCodeService.getCountryDetailInfo(numericCode);
};
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const generalInfo = getCountryGeneralInformationByNumericCode("840");
 * ```
 * @returns General information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export const getCountryGeneralInformationByNumericCode = (
	numericCode: string,
) => {
	return numericCodeService.getCountryGeneralInfo(numericCode);
};
/** * The following functions retrieve various types of country information
 * based on Numeric code identifiers.
 * @param numericCode - The Numeric code of the country.
 * @example
 * ```ts
 * const locationInfo = getCountryLocationInformationByNumericCode("840");
 * ```
 * @returns Location information of the country.
 * @throws Will throw an error if the Numeric code is not found.
 */
export const getCountryLocationInformationByNumericCode = (
	numericCode: string,
) => {
	return numericCodeService.getCountryLocationInfo(numericCode);
};
