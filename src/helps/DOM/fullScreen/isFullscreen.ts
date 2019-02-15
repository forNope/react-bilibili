import {isSsr} from "@helps/support";

export let isFullScreen: () => boolean;

if (!isSsr) {
	const apiArr = [
		"fullscreen", "fullScreen",
		"mozFullScreen", "webkitIsFullScreen",
	];
	
	apiArr.some((api) => {
		if (api in document) {
			isFullScreen = function () {
				return (document as any)[api];
			};
			return true;
		}
	});
}
