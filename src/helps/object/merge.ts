import {isArray, isFunction, isObject} from "@helps/types";
import {isEmpty} from "@helps/array";

type IOptions = {
	include?: string[];
	exclude?: string[];
};

function baseMerge (target: any, source: any) {
	if (!(isObject(target, "fuzzy") || isObject(source, "fuzzy"))) {
		throw new TypeError("target and source must be a object");
	}
	
	Object.keys(source).forEach((key) => {
		target[key] = source[key];
	});
	
	return target;
}

export function merge (target: any, ...sources: any[]) {
	sources.forEach((source: any) => {
		baseMerge(target, source);
	});
	
	return target;
}
