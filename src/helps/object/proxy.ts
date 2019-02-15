import {isFunction} from "@helps/types";
import {memorize} from "@helps/performance";

export function proxy (target: any,
                       get?: (target: any, key: string) => any,
                       set?: (target: any, key: string, value: any) => void) {
	const cache = memorize(
		function (key: string, value: any) {
			if (isFunction(value)) {
				return value.bind(this);
			} else {
				return value;
			}
		},
		function (key: string) {
			return key;
		},
	);
	
	return new Proxy(target, {
		get (target: any, key: string) {
			return get ? get(target, key) : cache.call(target, key, target[key]);
		},
		set (target: any, key: string, value: any) {
			if (set) {
				set(target, key, value);
			} else {
				target[key] = value;
			}
			return true;
		},
	});
}
