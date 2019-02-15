import {isDOM} from "@helps/DOM";
import {createMixinDecorator} from "@mixins/createMixinDecorator";
import {DOMHelps as imple} from "./implementation";
import {merge} from "@helps/object";

export {IDOMHelps} from "./interface";

delete imple.prototype.constructor;

export function DOMHelps (target: any, key?: string, descriptor?: PropertyDescriptor) {
	if (isDOM(target)) {
		return merge(target, imple.prototype);
	} else {
		return createMixinDecorator(target, key, descriptor, imple);
	}
}
