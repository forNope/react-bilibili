import {forEach} from "@helps/array/forEach";

export const fill = Array.prototype.fill
	? function <T = any> (arr: Array<T>,
	                      value: T,
	                      start: number = 0,
	                      end: number   = arr.length) {
		return arr.fill(value, start, end);
	}
	: function <T = any> (arr: Array<T>,
	                      value: T,
	                      start: number = 0,
	                      end: number   = arr.length) {
		forEach(
			arr,
			(_, index) => {
				arr[index] = value;
			},
			start,
			end,
		);
		return arr;
	};
