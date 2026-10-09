import { formatCurrency } from "../../index";

// ICU separates symbol and number with no-break spaces; compare with plain spaces.
const fmt = (...args: Parameters<typeof formatCurrency>) =>
	formatCurrency(...args).replace(/[  ]/g, " ");

describe("formatCurrency", () => {
	it("formats using the country's own currency and number format", () => {
		expect(fmt(1234.5, "US")).toBe("$1,234.50");
		expect(fmt(1234.5, "DE")).toBe("1.234,50 €");
		expect(fmt(1234.5, "GB")).toBe("£1,234.50");
		expect(fmt(1234567.5, "IN")).toBe("₹12,34,567.50");
	});

	it("respects the currency's own number of decimals", () => {
		expect(fmt(1234.5, "JP")).toBe("￥1,235");
		expect(fmt(1234.5, "KW", { locale: "en" })).toBe("KWD 1,234.500");
	});

	it("accepts ISO-2, ISO-3, numeric codes and names", () => {
		const expected = fmt(1234.5, "DE");
		for (const country of ["de", "DEU", "276", 276, "Germany", " germany "]) {
			expect(fmt(1234.5, country)).toBe(expected);
		}
	});

	it("lets the caller override the locale and pass Intl options through", () => {
		expect(fmt(1234.5, "DE", { locale: "en-US" })).toBe("€1,234.50");
		expect(fmt(1234.5, "US", { currencyDisplay: "code" })).toBe("USD 1,234.50");
		expect(
			fmt(1234.5, "US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
		).toBe("$1,235");
	});

	it("never lets options replace the style or the country's currency", () => {
		expect(fmt(1, "US", { currency: "EUR", style: "decimal" } as never)).toBe(
			"$1.00",
		);
	});

	it("handles zero and negative amounts", () => {
		expect(fmt(0, "US")).toBe("$0.00");
		expect(fmt(-5, "US")).toBe("-$5.00");
		expect(fmt(0.005, "US")).toBe("$0.01");
	});

	it("gives the same result on every machine for every country", () => {
		const first = fmt(1234.5, "ME");
		expect(first).toContain("€");
		for (const code of ["AQ", "XK", "MU", "TW", "CN", "ME"]) {
			expect(() => formatCurrency(1, code)).not.toThrow();
		}
	});

	it("rejects amounts that are not finite numbers", () => {
		for (const amount of [
			Number.NaN,
			Number.POSITIVE_INFINITY,
			"5",
			null,
			undefined,
			{},
		]) {
			expect(() => formatCurrency(amount as never, "US")).toThrow(TypeError);
		}
	});

	it("rejects unknown countries", () => {
		for (const country of ["XX", "Atlantis", ""]) {
			expect(() => formatCurrency(1, country)).toThrow("can not be found");
		}
	});
});
