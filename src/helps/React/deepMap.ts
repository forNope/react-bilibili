import * as React from "react";
import {isObject} from "@helps/types";
import {deepClone} from "@helps/object";
import {deepEach} from "./";

export function deepMap (children: React.ReactChildren,
                         fn: (child: React.ReactChild, index: number) => any): any {
	return React.Children.map(children, (child: any, index) => {
		const result = fn.call(this, child, index);
		
		if (isObject(result)) {
			return React.cloneElement(
				result, {children: deepMap(child.props.children, fn)},
			);
		}
		
		return result;
	});
}
