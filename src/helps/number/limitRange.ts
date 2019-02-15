import {validateNumber} from "@helps/validate";

export function limitRange (target: number,
                            max: number,
                            min: number = 0): number {
	if (!validateNumber(max)) {
		throw new TypeError("max is not a number");
	} else if (!validateNumber(target)) {
		throw new TypeError("target is not a number");
	} else if (!validateNumber(min)) {
		throw new TypeError("min is not a number");
	}
	
	return target > max
		? max
		: target < min
			? min
			: target;
}
