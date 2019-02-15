import {clean} from "@helps/array";
import {cssObjectToString, stringToCssObject} from "@helps/DOM";
import {hasStyle} from "./";

export function removeStyle (el: HTMLElement, styles: string) {
	const elStyles = stringToCssObject(el.style.cssText);
	
	clean(styles.split(" "), "")
		.forEach((name) => delete elStyles[name]);
	
	el.style.cssText = cssObjectToString(elStyles);
	
	return el;
}
