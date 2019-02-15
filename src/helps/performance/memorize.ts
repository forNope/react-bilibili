export function memorize (fn: Function, getKey: Function) {
	const caches: { [key: string]: any } = {};
	return function (...args: any[]) {
		const key = getKey.apply(this, args);
		
		if (!caches[key]) {
			caches[key] = fn.apply(this, args);
		}
		
		return caches[key];
	};
}
