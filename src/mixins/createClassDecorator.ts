import {overwriteCtor} from "@helps/class";
import {proxy} from "@helps/object";

export function createClassDecorator (target: any,
                                      get?: (target: any, key: string) => any,
                                      set?: (target: any, key: string, value: any) => void,
                                      ctor?: any) {
	proxy(target, get, set);
	if (ctor) {
		return overwriteCtor(target, function (targetCtor, ...args) {
			targetCtor.apply(this, args);
			ctor.apply(this, args);
		});
	}
}

// export function createDecorator (target: any,
//                                  key: string,
//                                  descriptor: PropertyDescriptor,
//                                  get?: () => any,
//                                  set?: (value: any) => void,
//                                  disables: {
// 	                                 classes?: boolean;
// 	                                 method?: boolean;
// 	                                 property?: boolean;
//                                  } = {}) {
// 	const {classes, method, property} = disables;
//
// 	if (key) {
// 		let val: any,
// 		    desc: PropertyDescriptor;
//
// 		const getter = get || function () {
// 			      return val;
// 		      },
// 		      setter = set || function (value) {
// 			      val = value;
// 		      };
//
// 		if (descriptor && !method) {
// 			desc = shallowClone<PropertyDescriptor>(descriptor, {
// 				get: getter,
// 				set: setter,
// 			});
// 			val = desc.value;
//
// 			delete desc.value;
// 			delete desc.writable;
// 			Object.defineProperty(target.prototype, key, desc);
// 			target.prototype[key] = val;
// 		} else if (!property) {
// 			desc = {
// 				get: getter,
// 				set: setter,
// 			};
// 			Object.defineProperty(target.prototype, key, desc);
// 		}
// 	} else if (!classes) {
//
// 	}
// }

// export function createClassPropertyDecorator (target: any,
//                                               key: string,
//                                               WillMixin: any,
//                                               descriptor: IClassPropertyDecorator = {},
//                                               options: {
// 	                                              disableClass?: boolean;
// 	                                              disableProperty?: boolean;
// 	                                              disableMethod?: boolean;
//                                               }                                   = {}) {
// 	const {get, set, constructor}                        = descriptor,
// 	      {disableClass, disableProperty, disableMethod} = options;
//
// 	const handler = {
// 		get (target: any, key: string) {
// 			if (key === "constructor") {
// 				return target[key];
// 			}
//
// 			if (get) {
// 				return get.call(target, target, key);
// 			} else {
// 				if (isFunction(target[key])) {
// 					return target[key].bind(target);
// 				} else {
// 					return target[key];
// 				}
// 			}
// 		},
// 		set (target: any, key: string, value: any) {
// 			if (set) {
// 				set.call(target, target, key, value);
// 			} else {
// 				target[key] = value;
// 			}
// 			return true;
// 		},
// 	};
//
// 	if (!disableClass && target.hasOwnProperty("prototype")) {
// 		if (!get && !set) {
// 			merge(target.prototype, WillMixin.prototype, {
// 				exclude: ["constructor"],
// 			});
// 			if (constructor) {
// 				return function (...args: any[]) {
// 					const instance = Object.create(target.prototype);
// 					constructor.apply(instance, args);
// 					target.apply(instance, args);
// 					return instance;
// 				};
// 			}
// 		} else {
// 			return new Proxy(target, {
// 				construct (target: any, args: any[]) {
// 					const proxy = new Proxy(Object.create(target.prototype), handler);
// 					if (constructor) {
// 						constructor.apply(proxy, args);
// 					}
// 					target.apply(proxy, args);
// 					return proxy;
// 				},
// 			});
// 		}
// 	} else if (isString(key)) {
// 		let ref: any;
// 		Object.defineProperty(target, key, {
// 			get () {
// 				return ref;
// 			},
// 			set (value) {
// 				ref = isObject(value, "fuzzy") ? new Proxy(value, handler) : value;
// 			},
// 		});
// 	} else {
// 		throw new Error("it's not called with a decorator");
// 	}
// }
