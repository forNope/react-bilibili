import {isSsr} from "@helps/support";

export let exitFullScreen: () => HTMLElement;

if (!isSsr) {
	const apiArr = [
		"exitFullscreen", "webkitCancelFullScreen",
		"mozCancelFullScreen", "cancelFullScreen",
	];
	
	apiArr.some((api) => {
		if (api in document) {
			exitFullScreen = function () {
				(document as any)[api]();
				return this;
			};
			return true;
		}
	});
}
