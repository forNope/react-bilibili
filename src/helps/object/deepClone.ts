import {isSsr} from "@helps/support";
import {isObject} from "@helps/types";

export function deepClone<T = any> (target: any): T {
	const result: any = {};
	
	Object.keys(target).forEach((name) => {
		result[name] = isObject(target[name])
			? deepClone(target[name])
			: target[name];
	});
	
	return result;
}
