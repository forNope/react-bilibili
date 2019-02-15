/**
 * e.g:
 *  link("testLinkFunction") // return: test-link-function
 * @param {string} str
 * @returns {string}
 */
export function link (str: string) {
	const reg = /[A-Z]/g;
	let match = reg.exec(str);
	while (match) {
		const val = match[0];
		str = str.replace(val, "-" + val.toLowerCase());
		match = reg.exec(str);
	}
	return str;
}
