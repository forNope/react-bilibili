export function forEach<T = any> (arr: T[],
                                  fn: (value: T, index: number, array: T[]) => boolean | void,
                                  start: number = 0,
                                  end: number   = arr.length,
                                  thisArg: any  = arr) {
	for (let i = start; i < end; i++) {
		if (fn.call(thisArg, arr[i], i, arr) === false) {
			break;
		}
	}
}
