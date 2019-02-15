import {isSsr} from "@helps/support";
import {isObject} from "@helps/types";

export let isDOM = function (el: HTMLElement) {
	return false;
};

if (!isSsr) {
	isDOM = window.hasOwnProperty("HTMLElement")
		? function (target: any) {
			return target instanceof HTMLElement;
		}
		: function (target: any) {
			return (
				target
				&& isObject(target, "fuzzy")
				&& target.nodeType === 1
				&& typeof target.nodeName === "string"
			);
		};
}
