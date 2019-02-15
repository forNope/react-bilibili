import {isFunction} from "@helps/types";
import * as React from "react";

export function isClassComponent (target: React.ReactElement<any> | Function) {
	return isFunction(target)
		? target.prototype
		&& target.prototype.hasOwnProperty("render")
		: React.isValidElement(target)
		&& React.Component.prototype.isPrototypeOf((target.type as any).prototype);
}
