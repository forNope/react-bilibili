import {isFunction} from "@helps/types/isFunction";

export function isObject<T = any> (target: any,
                                   mode: "fuzzy" | "strict" = "strict"): target is T {
	// fuzzy mode can match all can mount property's object
	// so event if null is object but this function cannot match it
	return mode === "strict"
		? Object.prototype.toString.call(target) === "[object Object]"
		// null is object, it is a legacy bug, so we exclude null
		: target && (typeof target === "object" || isFunction(target));
}
