let key = 0;

export function createKey () {
	return (key++) + Math.random().toString(32).substr(2, 4);
}
