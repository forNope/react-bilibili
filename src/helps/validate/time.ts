import {isNumber, isString} from "@helps/types";

export function validateTime (time: string) {
	if (isString(time)) {
		const _time = time.split(":");
		return isNumber(_time[0])
			&& isNumber(_time[1])
			&& _time.length === 2;
	}
}
