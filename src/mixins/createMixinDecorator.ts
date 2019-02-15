import {overwriteCtor} from "@helps/class";
import {deepClone, merge} from "@helps/object";
import {isClassComponent} from "@helps/React";
import {isObject} from "@helps/types";
import {isClassDecorator, isMethodDecorator, isPropertyDecorator} from "@mixins/helps";

/**
 *  create a mixin decorator, use this function you can use mixin like this
 *  @exampleMixin
 *  class Test {}
 *
 * @param target
 * @param {string} key
 * @param {PropertyDescriptor} descriptor
 * @param willMixin: classes
 *
 * @param ctor: custom constructor,
 * in this constructor {this} point to  what you decoration type
 * such as decorator class, {this} is class
 *
 * @param {{
 * classes?: boolean;
 * method?: boolean;
 * property?: boolean
 * }} disables: only not disable options can be decorator
 *
 * @returns {any}
 *
 * usage:
 *  class Mixin {
 *    constructor() {
 *      console.log("Im mixin");
 *    }
 *    mixinProperty = 2;
 *    mixinMethod() {
 *      console.log("Im a mixin method");
 *    }
 *  }
 *
 *  function egMixin(target, key, descriptor) {
 *    return createMixinDecorator(target, key, descriptor, Mixin, function() {
 *      console.log(`this is a custom constructor
 *      , use this you can have current function variable scope`)
 *    });
 *  }
 *
 *  @egMixin
 *  class Test {
 *    baseProperty = 3;
 *
 *    constructor() {
 *      console.log("new Test complete");
 *    }
 *  }
 *
 *  const test = new Test();
 *  // this is a custom constructor
 *      , use this you can have current function variable scope
 *  // Im mixin
 *  // new Test complete
 *  test.mixinMethod() // Im a mixin method
 *  test.mixinProperty // 2
 *  test.baseProperty // 3
 *
 *  class Test2 {
 *    @egMixin
 *    method() {}
 *
 *    @egMixin
 *    property  = {};
 *  }
 *
 *  const test2 = new Test2(); // ... same as above, but not {new Test complete}
 *  test2.method.mixinMethod(); // Im a mixin method
 *  test.property.mixinProperty; // 2
 *
 */
export function createMixinDecorator (target: any,
                                      key: string,
                                      descriptor: PropertyDescriptor,
                                      willMixin: any,
                                      ctor?: any,
                                      disables: {
	                                      classes?: boolean;
	                                      method?: boolean;
	                                      property?: boolean;
                                      } = {}) {
	const judgeArgs                   = [target, key, descriptor],
	      mixin                       = willMixin.prototype,
	      {classes, method, property} = disables;
	
	delete mixin.constructor;
	
	function executeCtor (target: any, ...args: any[]) {
		if (ctor) {
			ctor.apply(target, args);
		}
		willMixin.apply(target, args);
	}
	
	if (isClassComponent(target)) {
		const result = class extends (target as { new (props: any): any }) {
			constructor (props: any) {
				super(props);
				executeCtor(this);
			}
		};
		merge(result.prototype, mixin);
		return result;
	} else {
		if (!classes && isClassDecorator.apply(null, judgeArgs)) {
			merge(target.prototype, mixin);
			return overwriteCtor(target, function (targetCtor, ...args) {
				executeCtor(this, args);
				targetCtor.apply(this, args);
			});
		} else if (!method && isMethodDecorator.apply(null, judgeArgs)) {
			executeCtor(target[key]);
			merge(target[key], mixin);
		} else if (!property && isPropertyDecorator.apply(null, judgeArgs)) {
			let val: any;
			Object.defineProperty(target, key, {
				get () {
					return val;
				},
				set (value) {
					if (isObject(value, "fuzzy")) {
						val = merge(value, mixin);
						executeCtor(val);
					} else {
						val = value;
					}
				},
			});
		}
	}
}
