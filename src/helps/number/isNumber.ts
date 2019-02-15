export function isNumber (target: any): target is number {
	if (typeof target === "number") {
		// NaN's type is number
		return !isNaN(target);
	} else if (typeof target === "string") {
		return !isNaN(+target);
	}
	
	return false;
}
