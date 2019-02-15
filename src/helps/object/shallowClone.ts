import {isObject} from "@helps/types";

export function shallowClone<T = any> (...targets: T[]): T {
	return Object.assign.apply(this, targets);
}
