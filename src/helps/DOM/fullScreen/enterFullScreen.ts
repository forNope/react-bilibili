import {isSsr} from "@helps/support";

export let enterFullScreen: (el: HTMLElement) => HTMLElement;

if (!isSsr) {
	const apiArr = [
		      // w3c
		      "requestFullscreen", "requestFullScreen",
		      // webkit
		      "webkitRequestFullscreen", "webkitRequestFullScreen",
		      // mozilla
		      "mozRequestFullScreen",
	      ],
	      body   = document.body;
	
	apiArr.some((api) => {
		if (api in body) {
			enterFullScreen = function (el: HTMLElement) {
				(el as any)[api]();
				return el;
			};
			return true;
		}
		
		return false;
	});
}
