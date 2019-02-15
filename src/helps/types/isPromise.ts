import {isObject} from "@helps/types/isObject";
import {getTag} from ".";

export function isPromise<T = any> (target: any): target is Promise<T> {
	return target
		&& (target instanceof Promise
			|| getTag(target) === "[object Promise]"
			|| target.hasOwnProperty("then"));
}
