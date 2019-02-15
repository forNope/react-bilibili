export function isEmpty (str: string) {
	if (typeof str === "string") {
		return !str.trim();
	}
	
	console.warn("str is no string");
	
	return false;
}
