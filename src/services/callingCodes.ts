// Dataset calling codes longer than 3 digits are a shared code plus extra digits:
// NANP area codes (1268 -> +1), 4779 (+47, Svalbard), 5997/5999 (+599, Caribbean Netherlands).
// The dataset test fails if a new family appears.
export const baseCallingCode = (code: string) =>
	code.startsWith("1")
		? "1"
		: code.startsWith("599")
			? "599"
			: code.slice(0, 2);

/** 49 -> "+49", 1268 -> "+1 268". */
export const formatCallingCode = (phone: number): string => {
	const code = String(phone);
	if (code.length <= 3) {
		return `+${code}`;
	}
	const base = baseCallingCode(code);
	return `+${base} ${code.slice(base.length)}`;
};
