import {forEach} from "@helps/object/forEach";
import {isObject} from "@helps/types";

export function shallowEqual (source: any, target: any) {
	if (source === target) {
		return true;
	} else if (isObject(source) && isObject(target)) {
		return Object
			.keys(source)
			.every((key) => source[key] === target[key]);
	} else {
		return false;
	}
}
