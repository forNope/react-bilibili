export function bubblingSort<T = any> (target: Array<T>) {
	const result = [];
	for (let i = 0, len = target.length; i < len; i++) {
		const value = target[i];
		for (let j = i + 1; j < len; j++) {
			const nextValue = target[j];
			if (value > nextValue) {
				[target[i], target[j]] = [nextValue, value];
			}
		}
	}
}
