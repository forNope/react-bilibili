import * as React from "react";
import * as ReactDOM from "react-dom";
import {mergeProps, isClassComponent, getOriginEl} from "@helps/React";


/**
 * merge properties to the elements rendered by the component
 * @param {React.Component} Com
 * @param {{[p: string]: any}} props
 * @return React.Component
 */
let time = 0;

export function mergeComponentProps (Com: React.ReactElement<any>,
                                     props: { [key: string]: any }) {
	if (isClassComponent(Com)) {
		const classes = class extends (Com.type as React.ComponentClass) {
			componentDidMount () {
				super.componentDidMount();
				const el = ReactDOM.findDOMNode(this) as HTMLElement;
				Object
					.keys(props)
					.forEach((key) => {
						el.setAttribute(key, props[key]);
					});
			}
		};
		return React.createElement(classes);
	} else {
		throw new Error("mergeComponentProps: please check the parameter is a react component");
	}
}
