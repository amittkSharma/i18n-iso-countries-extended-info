import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/data.ts"],
	format: ["esm", "cjs"],
	dts: true,
	splitting: true,
	clean: true,
	// Node ESM cannot import JSON without an attribute, so inline the locale file.
	noExternal: ["i18n-iso-countries/langs/en.json"],
	outDir: "dist",
});
