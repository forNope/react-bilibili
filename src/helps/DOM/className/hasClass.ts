import {clean} from "@helps/array";

export function hasClass (el: HTMLElement,
                          className: string,
                          mode: "every" | "some" = "some") {
	const classNames = clean(className.split(" "), ""),
	      list       = el.classList;
	
	return mode === "every"
		? classNames.every((name) => list.contains(name))
		: classNames.some((name) => list.contains(name));
}
