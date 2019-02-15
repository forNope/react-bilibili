import {toNum} from "@helps/number/toNum";

export function getTranslate (el: HTMLElement) {
	const style     = getComputedStyle(el),
	      transform = style.transform || style.webkitTransform,
	      matrix    = transform
		      .slice(transform.indexOf("("), transform.length - 1)
		      .split(",");
	
	if (transform.startsWith("matrix")) {
		return {
			x: toNum(matrix[4]),
			y: toNum(matrix[5]),
			z: 0,
		};
	} else {
		return {
			x: toNum(matrix[12]),
			y: toNum(matrix[13]),
			z: toNum(matrix[14]),
		};
	}
}
