export function formatDate(date: Date | number): string {
	let _date = date as Date;
	if (typeof date === "number") {
		_date = new Date(date);
	}

	const year = _date.getFullYear(),
		month = _date.getMonth(),
		day = _date.getDay(),
		hours = _date.getHours(),
		min = _date.getMinutes();

	return `${year}-${month}-${day} ${hours}:${min}`;
}
