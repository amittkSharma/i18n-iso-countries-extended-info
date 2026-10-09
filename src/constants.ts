import { registerLocale } from "i18n-iso-countries/index.js";
import en from "i18n-iso-countries/langs/en.json";

export const BASIC_LANGUAGE = "en";

// Consumers must not have to register the locale themselves.
registerLocale(en);
