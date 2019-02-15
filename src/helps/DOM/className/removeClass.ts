import {clean} from "@helps/array";

export function removeClass (el: HTMLElement, className: string) {
	const list = el.classList;
	clean(className.split(" "), "")
		.forEach((name) => {
			list.remove(name);
		});
	return el;
}
