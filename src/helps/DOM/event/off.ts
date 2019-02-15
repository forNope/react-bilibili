import {clean} from "@helps/array";
import {data, removeData} from "@helps/DOM";
import {hook} from "@helps/DOM/event/hook";
import {on} from "@helps/DOM/event/on";
import {forEach} from "@helps/object";
import {isArray} from "@helps/types";
import {type as fullScreenType} from "@helps/DOM/fullScreen/fullScreenChange";

export function off (el: Node,
                     type?: string,
                     listener?: EventListener) {
	if (type in hook) {
		on(el, hook[type], listener);
	}
	
	const argLen = arguments.length;
	
	// sort by most possible
	if (argLen === 3) {
		clean(type.split(" "), "")
			.forEach((eventType) => {
				const listeners = data(el, eventType) as Array<EventListener>;
				if (listeners) {
					const index = listeners.indexOf(listener);
					if (index !== -1) {
						listeners.splice(index, 1);
					}
					if (eventType === fullScreenType) {
						document.removeEventListener(eventType, listener);
					} else {
						el.removeEventListener(eventType, listener);
					}
				}
			});
	} else if (argLen === 2) {
		clean(type.split(" "), "")
			.forEach((eventType) => {
				const listeners = data(el, eventType) as Array<EventListener>;
				if (listeners) {
					listeners.forEach((listener) => {
						if (eventType === fullScreenType) {
							document.removeEventListener(eventType, listener);
						} else {
							el.removeEventListener(eventType, listener);
						}
					});
					removeData(el, eventType);
				}
			});
	} else if (argLen === 1) {
		forEach(data(el), (eventType) => {
			off(el, eventType);
		});
		removeData(el);
	}
	
	return el;
}
