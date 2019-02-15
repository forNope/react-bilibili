import {ArrayWrapper} from "./Array";
import {isArray} from "@helps/types";

export function lazy (source: any) {
	if (isArray(source)) {
		return new ArrayWrapper(source);
	}
}
