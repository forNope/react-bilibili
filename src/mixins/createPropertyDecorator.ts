import {shallowClone} from "@helps/object";
import {isMethodDecorator, isPropertyDecorator} from "@mixins/helps";

export function createPropertyDecorator (target: any,
                                         key: string,
                                         descriptor: PropertyDescriptor,
                                         get: () => any,
                                         set: (value: any) => void) {
	
	let val: any,
	    desc: PropertyDescriptor;
	
	const getter = get || function () {
		      return val;
	      },
	      setter = set || function (value) {
		      val = value;
	      };
	
	if (isMethodDecorator(target, key, descriptor)) {
		desc = shallowClone<PropertyDescriptor>(descriptor, {
			get: getter,
			set: setter,
		});
		val = desc.value;
		
		delete desc.value;
		delete desc.writable;
		
		Object.defineProperty(target, key, desc);
		target[key] = val;
	} else if (isPropertyDecorator(target, key, descriptor)) {
		desc = {
			get: getter,
			set: setter,
		};
		
		Object.defineProperty(target, key, desc);
	}
}
