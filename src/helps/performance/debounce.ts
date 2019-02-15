import {overload, IOverloadProperty} from "../overload";
import {EventHandler} from "react";

export interface IDebounceArgs extends IOverloadProperty {
	(wait: number, isReactEvent?: boolean): any;
	
	(fn: Function, wait: number, isReactEvent?: boolean): any;
}

const debounce: IDebounceArgs = overload(function (wait: number, isReactEvent?: boolean) {
	return function (target: ClassDecorator,
	                 property: string,
	                 description: PropertyDescriptor) {
		let timer: number;
		const fn = description.value;
		
		description.value = function (e: Event) {
			const event = isReactEvent ? {...e} : e;
			window.clearTimeout(timer);
			timer = window.setTimeout(() => fn.call(this, event), wait);
		};
	};
});

debounce.addMethod(function (fn: Function, wait: number, isReactEvent?: boolean) {
	let timer: number;
	console.warn("advice use decorator mode for debounce");
	
	return function () {
		clearTimeout(timer);
		if (isReactEvent) {
			const event = {...arguments[0]};
			timer = window.setTimeout(() => fn.call(this, event), wait);
		} else {
			const args = arguments;
			timer = window.setTimeout(() => fn.apply(this, args), wait);
		}
	};
});

export {debounce};
