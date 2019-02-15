import {isNumber} from "@helps/types";
import {validateTime} from "@helps/validate";

export function formatTime (time: number): string;
export function formatTime (time: string): number;
export function formatTime (time: number | string) {
	if (isNumber(time)) {
		const _time = Math.round(time);
		
		if (_time < 0) {
			throw new Error("time must is greate than or equal to 0");
		}
		
		let minute: string | number = Math.floor(_time / 60),
		    sec: string | number    = _time % 60;
		
		minute = minute < 10 ? `0${minute}` : minute;
		sec = sec < 10 ? `0${sec}` : sec;
		
		return `${minute}:${sec}`;
	} else {
		if (!validateTime(time)) {
			return "00:00";
		}
		
		const _time = time.split(":"),
		      min   = +_time[0],
		      sec   = +_time[1];
		
		return min * 60 + sec;
	}
}
