import {trimAll} from "@helps/string";
import {isString} from "@helps/types";

export function stringToCssObject (str: string) {
	if (!isString(str)) {
		throw new TypeError("argument must be a string");
	}
	
	const result: { [key: string]: any } = {};
	
	trimAll(str)
		.split(";")
		.forEach((property) => {
			const kv    = property.split(":"),
			      key   = kv[0],
			      value = kv[1];
			
			result[key] = key && value;
		});
	
	return result;
}
