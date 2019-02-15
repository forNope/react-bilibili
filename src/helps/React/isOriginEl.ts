import * as React from "react";
import {isString} from "@helps/types";

export function isOriginEl (ReactEl: React.ReactElement<any>) {
	return React.isValidElement(ReactEl) && isString(ReactEl.type);
}
