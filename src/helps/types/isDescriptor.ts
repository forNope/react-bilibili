const properties = ["configurable", "enumerable", "writable"];

export function isDescriptor (target: any): target is PropertyDescriptor {
	return properties
		.some((property) => target.hasOwnProperty(property));
}
