export function forEach (obj: any, fn: (key: string, value: any) => void) {
	Object.keys(obj)
	      .forEach((key) => {
		      const value = obj[key];
		      fn.call(obj, key, value);
	      });
	return obj;
}
