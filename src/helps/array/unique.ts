import {from} from "@helps/array/from";

export const unique = typeof Set !== "undefined"
	? function <T = any> (arr: T[]) {
		return from(new Set(arr));
	}
	: function <T = any> (arr: T[]) {
		const result: T[] = [];
		new Set(arr).forEach((v) => {
			result.push(v);
		});
		return result;
	};
