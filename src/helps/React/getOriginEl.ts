import {deepClone, shallowClone} from "@helps/object";
import {isOriginEl} from "@helps/React/isOriginEl";
import {isSsr} from "@helps/support";
import * as React from "react";
import {isString} from "@helps/types";

/**
 * e.g:
 *  const Component = () => <p id="test">test component</p>
 *
 *  console.log(<Component>)
 *  output:
 *  @ReactElement
 *  {
 *    type: Function,
 *    props: {},
 *    ...
 *  }
 *
 *  getOriginEl(<Component>)
 *  output:
 *  @ReactElement
 *  {
 *    type: p,
 *    props: {
 *    id: "test",
 *    children: "test component",
 *    },
 *    ...
 *  }
 *
 *  getOriginEl(<div>test<div>)
 *  output:
 *  @ReactElement
 *  {
 *    type: div,
 *    props: {children: "test"},
 *    ...
 *  }
 *
 * @param ReactEl: ReactElement,
 * like {<div>test</div>} or {<YourComponent/>}
 */
export function getOriginEl (ReactEl: React.ReactElement<any>) {
	if (React.isValidElement(ReactEl)) {
		const type  = ReactEl.type,
		      props = ReactEl.props;
		
		return isOriginEl(ReactEl)
			? ReactEl
			: (type as Function).call(ReactEl, props);
	}
	
	throw new Error("getOriginEl: ReactEl must be a ReactElement");
}
