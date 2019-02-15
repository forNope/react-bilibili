import {isArray} from "@helps/types";

export function flatten (arr: any[], level?: number) {
	let result: any[] = [];
	
	arr.forEach((value) => {
		if (isArray(value)) {
			result = result.concat(flatten(value));
		} else {
			result.push(value);
		}
	});
	
	return result;
}
