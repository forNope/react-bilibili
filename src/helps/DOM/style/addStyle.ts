import * as React from "react";
import {isString, isObject} from "@helps/types";
import {cssObjectToString, stringToCssObject} from "@helps/DOM";

/**
 * e.g:
 *  const el = document.createElement("div");
 *  addStyle(el, {width: "200px"});
 *  addStyle(el, "height: 200px");
 *  addStyle(el, {width: "300px"});
 *  console.log(el.style.cssText); // width:300px;height:200px;
 * @param {HTMLElement} el
 * @param {React.CSSProperties | string} styles
 * @return el
 */
export function addStyle (el: HTMLElement, styles: React.CSSProperties | string) {
	const elStyles = stringToCssObject(el.style.cssText);
	
	if (isString(styles)) {
		styles = stringToCssObject(styles);
	}
	
	Object
		.keys(styles)
		.forEach((key) => {
			elStyles[key] = (styles as any)[key];
		});
	
	el.style.cssText = cssObjectToString(elStyles);
	return el;
}
