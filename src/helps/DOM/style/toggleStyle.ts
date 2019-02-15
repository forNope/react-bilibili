import {isString} from "@helps/types";
import * as React from "react";
import {
	stringToCssObject,
	hasStyle,
	addStyle,
	removeStyle,
} from "@helps/DOM";

export function toggleStyle (el: HTMLElement, styles: React.CSSProperties | string) {
	if (isString(styles)) {
		styles = stringToCssObject(styles as string);
	}
	
	Object.getOwnPropertyNames(styles)
	      .forEach((key) => {
		      hasStyle(el, key) ? removeStyle(el, key) : addStyle(el, key);
	      });
}
