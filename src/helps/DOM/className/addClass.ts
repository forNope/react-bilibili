import {clean} from "@helps/array";

/**
 * e.g.:
 *  const el = document.querySelector("#example");
 *  addClass(el, "test1 test2");
 *  el.className output: test1 test2
 * @param {HTMLElement} el
 * @param {string} className
 * @returns {HTMLElement}
 */
export function addClass (el: HTMLElement, className: string) {
	const list = el.classList;
	clean(className.split(" "), "")
		.forEach((name) => {
			list.add(className);
		});
	return el;
}
