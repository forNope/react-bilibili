import {isFunction, isNumber} from "@helps/types";
import {createPropertyDecorator} from "@mixins/createPropertyDecorator";

export function throttle (fn: Function | number, interval?: number): any {
	const argLen = arguments.length;
	let start = Date.now(),
	    first = true;
	
	if (argLen === 1) {
		return function (target: any, key: string, descriptor: PropertyDescriptor) {
			let index = -1;
			const interval = fn as number;
			const arr: any[] = [];
			Object.defineProperty(target, key, {
				set (val) {
					const i = ++index;
					this["__index__"] = i;
					arr[i] = function () {
						const now = Date.now();
						if (first) {
							val.apply(this, arguments);
							first = false;
						}
						
						if (now - start > interval) {
							val.apply(this, arguments);
							start = now;
						}
					};
				},
				get () {
					return arr[this["__index__"]];
				},
			});
		};
	} else if (argLen === 2) {
		return function () {
			const now = Date.now();
			if (first) {
				(fn as Function).apply(this, arguments);
				first = false;
			}
			
			if (now - start > interval) {
				(fn as Function).apply(this, arguments);
				start = now;
			}
		};
	}
}
