export function firstUpperCase (str: string) {
	if (str) {
		return str.replace(str[0], str[0].toUpperCase());
	}
}
