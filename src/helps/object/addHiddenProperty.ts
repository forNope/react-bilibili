import {isObject} from "@helps/types";

export function addHiddenProperty (target: any,
                                   property: string,
                                   value: any,
                                   options: {
	                                   configurable?: boolean,
	                                   writable?: boolean,
                                   } = {
	                                   configurable: true,
	                                   writable: true,
                                   }) {
	const {configurable, writable} = options;
	if (isObject(target, "fuzzy")) {
		Object.defineProperty(target, property, {
			enumerable: false,
			configurable,
			writable,
			value,
		});
	} else {
		throw new TypeError("target is not a object");
	}
	
	return target;
}