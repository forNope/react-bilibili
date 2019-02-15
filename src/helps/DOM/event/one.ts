import {clean} from "@helps/array";
import {on, off} from "./";

export function one (el: Node,
                     type: string,
                     listener: EventListener) {
	clean(type.split(" "), "")
		.forEach((eventType) => {
			on(
				el,
				eventType,
				function cb (...args: any[]) {
					listener.apply(this, args);
					off(el, eventType, cb);
				},
			);
		});
	
	return el;
}
