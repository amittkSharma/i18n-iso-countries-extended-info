"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("node:fs"));
const readFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" });
        return data;
    }
    catch (error) {
        throw Error(`Unable to read the file from path: ${filePath} due to ${error.message}`);
    }
};
exports.readFile = readFile;
const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, data);
    }
    catch (error) {
        throw Error(`Unable to read the file from path: ${filePath} due to ${error.message}`);
    }
};
exports.writeFile = writeFile;
