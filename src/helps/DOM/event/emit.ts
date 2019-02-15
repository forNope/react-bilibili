import {clean} from "@helps/array";
import {data} from "@helps/DOM";
import {forEach} from "@helps/object";
import {isArray} from "@helps/types";

export function emit (el: Node,
                      type?: string) {
	const event = {
		target: el,
		currentTarget: el,
		type: "",
	};
	
	if (type) {
		clean(type.split(" "), "")
			.forEach((eventType) => {
				const listeners = data(el, eventType) as Array<EventListener>;
				if (listeners) {
					event.type = eventType;
					listeners.forEach((cb) => {
						cb.call(el, event);
					});
				}
			});
	} else {
		forEach(data(el), (eventType) => {
			emit(el, eventType);
		});
	}
	
	return el;
}
