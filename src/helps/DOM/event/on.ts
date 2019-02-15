import {clean} from "@helps/array";
import {isArray} from "@helps/types";
import {data} from "../";
import {hook} from "./hook"

export function on (el: Node,
                    type: string,
                    listener: EventListener) {
	if (type in hook) {
		on(el, hook[type], listener);
	}
	
	if (listener) {
		clean(type.split(" "), "")
			.forEach((eventType) => {
				const listeners = data(el, eventType) as Array<EventListener>;
				
				if (listeners) {
					data(el, eventType, listeners.concat(listener));
				} else {
					data(el, eventType, [listener]);
				}
				
				el.addEventListener(eventType, listener);
			});
	}
	
	return el;
}
