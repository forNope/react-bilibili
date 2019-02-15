import {isFunction} from "@helps/types/isFunction";

export function isClass (target: any): target is Function {
	return isFunction(target) && target.constructor;
}
