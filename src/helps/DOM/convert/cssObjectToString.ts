import {forEach} from "@helps/object";
import {link} from "@helps/string";
import * as React from "react";
import {isObject} from "@helps/types";

export function cssObjectToString (cssPropertyObj: React.CSSProperties) {
	if (!isObject(cssPropertyObj)) {
		throw new TypeError("cssPropertyObject must be a object");
	}
	const result: string[] = [];
	forEach(cssPropertyObj, (key, value) => {
		result.push(`${link(key)}: ${value}`);
	});
	return result.join(";") + ";";
}
