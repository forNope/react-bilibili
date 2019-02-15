import {isDescriptor, isNumber, isString} from "@helps/types";

export function isClassDecorator (target: any, key: any, descriptor: any) {
	return target && !key && !descriptor;
}

export function isMethodDecorator (target: any, key: any, descriptor: any) {
	return descriptor && isDescriptor(descriptor);
}

export function isPropertyDecorator (target: any, key: any, descriptor: any) {
	return isString(key) && !descriptor;
}

export function isParameterDecorator (target: any, key: any, descriptor: any) {
	return isNumber(key) && !descriptor;
}
