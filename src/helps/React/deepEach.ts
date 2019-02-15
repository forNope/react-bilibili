import * as React from "react";
import {isObject} from "@helps/types";

export function deepEach (children: React.ReactChildren,
                          fn: (child: React.ReactChild, index: number) => void) {
	React.Children.forEach(children, function (child: React.ReactElement<any>, index) {
		fn.call(this, child, index);
		
		if (isObject(child) && child.props.children) {
			deepEach(child.props.children, fn);
		}
	});
}
