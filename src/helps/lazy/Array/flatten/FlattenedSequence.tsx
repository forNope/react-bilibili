import {flatten} from "@helps/array/flatten";
import {IEachFn} from "@helps/lazy/Array/interface";
import {isArray} from "@helps/types";
import {ArrayLikeSequence} from "../ArrayLikeSequence";

export class FlattenedSequence extends ArrayLikeSequence {
	private cache: Array<any> = [];
	
	public get (index: number) {
		const value = this.parent.get(index);
		return isArray(value) ? flatten(value) : value;
	}
}
