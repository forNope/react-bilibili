export function includes<T = any> (arr: Array<T>,
                                   searchElement: any,
                                   fromIndex: number = 0) {
	let i: number,
	    len: number;
	
	if (fromIndex < 0) {
		i = 0;
		len = Math.abs(fromIndex) > arr.length ? arr.length : arr.length + fromIndex;
	} else {
		i = fromIndex;
		len = arr.length;
	}
	
	for (; i < len; i++) {
		if (arr[i] === searchElement) {
			return true;
		}
	}
	
	return false;
}
