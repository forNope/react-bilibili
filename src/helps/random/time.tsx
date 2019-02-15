import { validateTime } from "@helps/validate";
import { formatTime } from "@helps/format";
import { randomNumber } from "./";

export function randomTime(limit?: string) {
	let _limit = formatTime("59:00") as number;
	if (limit) {
		if (!validateTime(limit)) {
			throw new TypeError("limit's format must like {mm:ss} or {hh:mm:ss}");
		}
		_limit = formatTime(limit) as number;
	}

	return formatTime(randomNumber(_limit, 1));
}
