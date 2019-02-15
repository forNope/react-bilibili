import { randomNumber } from "./";

export type dateType = "yyyy-mm-dd" | "mm-dd";

export function randomDate(year: number = new Date().getFullYear(), type: dateType = "yyyy-mm-dd"): string {
	let month: string | number = randomNumber(12, 1),
		day: string | number,
		hours: string | number = randomNumber(24),
		minute: string | number = randomNumber(60);

	if (month === 2) {
		day = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
			? randomNumber(29, 1)
			: randomNumber(28, 1);
	} else if (month <= 7) {
		day = month % 2 === 0 ? randomNumber(30, 1) : randomNumber(31, 1);
	} else {
		day = month % 2 === 0 ? randomNumber(31, 1) : randomNumber(30, 1);
	}

	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;
	hours = hours < 10 ? `0${hours}` : hours;
	minute = minute < 10 ? `0${minute}` : minute;
	return (type === "yyyy-mm-dd" ? `${year}-${month}-${day}` : `${month}-${day}`) + ` ${hours}:${minute}`;
}
