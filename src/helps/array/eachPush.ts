export function eachPush<T> (length: number, cb: (i: number, dataList: Array<T>) => T): Array<T> {
	const dataList: Array<T> = [];
	for (let i = 0; i < length; i++) {
		dataList.push(cb(i, dataList));
	}
	return dataList;
}
