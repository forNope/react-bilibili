import * as React from "react";

export function mergeProps (ReactEl: React.ReactElement<any>,
                            props: { [key: string]: any }) {
	return React.cloneElement(ReactEl, props);
}
