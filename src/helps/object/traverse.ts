export function traverseObject (target: any,
                                cb: (key: string, value: string) => any,
                                mode: "own" | "any" = "own") {
	for (const key in target) {
		if (mode === "own") {
			if (target.hasOwnProperty(key)) {
				return cb(key, target[key]);
			}
		} else {
			return cb(key, target[key]);
		}
	}
}
