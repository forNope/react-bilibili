import {createMixinDecorator} from "@mixins/createMixinDecorator";
import {EventEmitter} from "./implementation";
import {addHiddenProperty} from "@helps/object";

export {IEventEmitter} from "./interface";

export function eventEmitter (onlyInside: boolean = true): Function {
	return function (target: any, key?: string, descriptor?: PropertyDescriptor) {
		return createMixinDecorator(target, key, descriptor, EventEmitter, function () {
			if (onlyInside) {
				addHiddenProperty(this, "__EventEmitterListeners", {});
			}
		});
	};
}
