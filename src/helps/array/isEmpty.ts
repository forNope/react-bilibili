import {isArray} from "@helps/types";

export function isEmpty (arr: any) {
	if (isArray(arr)) {
		return arr.length === 0;
	} else {
		throw new Error("argument must be a array");
	}
}
