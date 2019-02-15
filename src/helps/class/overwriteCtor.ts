export function overwriteCtor (classes: any, fn: (ctor: any, ...args: any[]) => any) {
	return function (...args: any[]) {
		const instance = Object.create(classes.prototype);
		return fn.apply(instance, [classes.bind(instance), ...args]) || instance;
	};
}
