import {data, on} from "@helps/DOM";
import {isSsr} from "@helps/support";
import {isWebKit, isMoz, isMS} from "@helps/support/";

export const type = isWebKit
	? "webkitfullscreenchange"
	: isMoz
		? "mozfullscreenchange"
		: isMS
			? "MSFullscreenChange"
			: "fullscreenchange";

export function fullScreenChange (el: HTMLElement, listener: EventListener) {
	const listeners = data(el, type) as Array<EventListener>;
	if (listeners) {
		data(el, type, listeners.concat(listener));
	} else {
		data(el, type, [listener]);
	}
	if (!isSsr) {
		document.addEventListener(type, listener);
	}
}
