import {isString} from "@helps/types";
import * as React from "react";
import {cssObjectToString} from "../";

export function setStyle (el: HTMLElement, styles: React.CSSProperties | string) {
	el.style.cssText = isString(styles)
		? styles
		: cssObjectToString(styles);

	return el;
}
