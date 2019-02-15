import {isClassComponent} from "@helps/React";
import {isFunction} from "@helps/types";
import * as React from "react";

export function isSFC (ReactEl: React.ReactElement<any>) {
	return React.isValidElement(ReactEl)
		&& isFunction(ReactEl.type)
		&& !isClassComponent(ReactEl);
}
