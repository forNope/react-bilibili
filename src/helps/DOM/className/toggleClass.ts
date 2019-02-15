import {clean} from "@helps/array";

export function toggleClass (el: HTMLElement, className: string) {
	const list = el.classList;
	clean(className.split(" "), "")
		.forEach((name) => {
			list.toggle(name);
		});
	return el;
}
