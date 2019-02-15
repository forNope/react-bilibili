export function formatNumber(num: number): string | number {
	if (num < 0) {
		throw new Error("num must is greater than 0");
	}

	if (num < 10000) {
		return num;
	}

	const tenThousand = 10000,
		aHundredMillion = tenThousand * 10000;

	if (num < tenThousand) {
		return num.toString();
	} else if (num < aHundredMillion) {
		return (num / 10000).toFixed(1) + "万";
	} else if (num >= aHundredMillion) {
		return (num / aHundredMillion).toFixed(1) + "亿";
	} else {
		throw new TypeError("cannot convert number:" + num + ", please make sure the num is a number");
	}
}
