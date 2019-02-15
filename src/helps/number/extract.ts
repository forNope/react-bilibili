export function extractNumber(str: string) {
	return +str.replace(/[^0-9.]/ig, "");
}
