"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASIC_LANGUAGE = void 0;
const tslib_1 = require("tslib");
const i18n_iso_countries_1 = require("i18n-iso-countries");
const en_json_1 = tslib_1.__importDefault(require("i18n-iso-countries/langs/en.json"));
exports.BASIC_LANGUAGE = "en";
// Consumers must not have to register the locale themselves.
(0, i18n_iso_countries_1.registerLocale)(en_json_1.default);
