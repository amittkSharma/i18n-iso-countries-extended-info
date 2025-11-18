import * as fs from "node:fs";

export const readFile = (filePath: string) => {
	try {
		const data = fs.readFileSync(filePath, { encoding: "utf-8" });

		return data;
	} catch (error) {
		throw Error(
			`Unable to read the file from path: ${filePath} due to ${(error as Error).message}`,
		);
	}
};

export const writeFile = (filePath: string, data: any) => {
	try {
		fs.writeFileSync(filePath, data);
	} catch (error) {
		throw Error(
			`Unable to read the file from path: ${filePath} due to ${(error as Error).message}`,
		);
	}
};
