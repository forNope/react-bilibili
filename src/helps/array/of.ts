import {forEach} from "@helps/array/forEach";

export const of = Array.of
	? function (...item: any[]) {
		return Array.of(...item);
	}
	: function (...item: any[]) {
		const result: any[] = [];
		forEach(item, (value) => {
			result.push(value);
		});
		return result;
	};
