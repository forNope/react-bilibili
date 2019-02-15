export function validateNumber(num: string | number) {
	if (typeof num === "number") {
		return !isNaN(num);
	} else {
		return !isNaN(+num);
	}
}
