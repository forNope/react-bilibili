import {getDimension, getOffset} from "./";

/**
 * get current mouse position relative el
 * @param {HTMLElement} el
 * @param {number} xy
 * @param {"x" | "y"} axis
 * @returns {number}
 */

export function getMousePos (el: HTMLElement,
                             event: MouseEvent | React.MouseEvent<HTMLElement>) {
	const rect      = el.getBoundingClientRect(),
	      targetDim = getDimension(el);
	return {
		x: event.clientX - rect.left,
		y: -(event.clientY - rect.top - targetDim.height),
	};
}
