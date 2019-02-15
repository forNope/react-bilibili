export interface IOverloadProperty {
	(...args: any[]): any;
	
	addMethod?(method: Function): void;
}

/**
 * overload function,
 * @param {Function} method
 * @returns {IFuncInfo}
 *
 * e.g:
 *  const func = overload(function (name) { console.log(name);});
 *  func.addMethod(function (name, age) {console.log(name, age)});
 *  func("phantom") // phantom
 *  func("phantom", 26) // phantom 26
 */
export function overload (method: Function): IOverloadProperty {
	const methods: Array<Function> = [method]; // all overload functions
	
	const fn: IOverloadProperty = function (...args: any[]) {
		// arguments is not a Array, need covert it
		// find the arguments length equals method parameters length's function and invoke it
		if (args.length === method.length) {
			method.apply(this, args);
		} else {
			for (let i = 0, len = methods.length; i < len; i++) {
				const method = methods[i];
				if (args.length === method.length) {
					method.apply(this, args);
					break;
				}
			}
		}
	};
	
	fn.addMethod = (method: Function) => { methods.push(method); };
	
	return fn;
}
