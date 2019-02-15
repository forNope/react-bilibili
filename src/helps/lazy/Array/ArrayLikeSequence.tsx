import {IEachFn, IFilterFn, IMapFn} from "@helps/lazy/Array/interface";
import {Sequence} from "@helps/lazy/Sequence";
import {MappedSequence} from "@helps/lazy/Array/map/MappedSequence";
import {FilteredSequence} from "@helps/lazy/Array/filter/FilteredSequence";
import {FlattenedSequence} from "@helps/lazy/Array/flatten/FlattenedSequence";

export class ArrayLikeSequence extends Sequence {
	public parent: ArrayLikeSequence;
	
	constructor (parent?: ArrayLikeSequence) {
		super(parent);
	}
	
	public each (fn: IEachFn) {
		for (let i = 0, len = this.length(); i < len; i++) {
			if (fn(this.get(i), i) === false) {
				break;
			}
		}
	}
	
	public get (index: number): any {
		return this.parent.get(index);
	}
	
	public take (length: number): Array<any> {
		const sourceLen          = this.length(),
		      result: Array<any> = [];
		
		if (length > 0) {
			length = length >= sourceLen ? sourceLen : length;
			
			for (let i = 0; i < length; i++) {
				result.push(this.get(i));
			}
		} else {
			length = sourceLen - Math.abs(length);
			
			for (let i = sourceLen; i > length; i--) {
				result.push(this.get(i));
			}
		}
		
		return result;
	}
}
