import {isDOM} from "@helps/DOM";

export function getScrollParent (el: HTMLElement): any {
	if (el && isDOM(el)) {
		const overflowY    = window.getComputedStyle(el).overflowY,
		      isScrollable = overflowY !== "visible" && overflowY !== "hidden";
		
		if (isScrollable && el.scrollHeight > el.clientHeight) {
			return el;
		} else {
			return getScrollParent(el.parentElement);
		}
	} else {
		return window;
	}
}
