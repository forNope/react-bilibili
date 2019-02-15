/**
 * get el's final width and height
 * @param {HTMLElement} el
 * @returns {{width: number; height: number}}
 */

export function getDimension (el: HTMLElement) {
	const style = getComputedStyle(el);
	return {
		width: parseFloat(style.getPropertyValue("width")),
		height: parseFloat(style.getPropertyValue("height")),
	};
}
