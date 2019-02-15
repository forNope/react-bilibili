import {ArrayLikeSequence} from "@helps/lazy/Array/ArrayLikeSequence";
import {IFilterFn} from "@helps/lazy/Array/interface";
import {Iterator} from "@helps/lazy/Iterator";
import {Sequence} from "@helps/lazy/Sequence";

export class FilterIterator extends Iterator {
	private filterFn: IFilterFn;
	private filterIndex = -1;
	private cache: Array<any> = [];
	
	constructor (sequence: ArrayLikeSequence, filterFn: IFilterFn) {
		super(sequence);
		this.filterFn = filterFn;
	}
	
	public getIndex () {
		return this.filterIndex;
	}
	
	public current () {
		if (this.cache[this.filterIndex]) {
			return this.cache[this.filterIndex];
		} else {
			return super.current();
		}
	}
	
	public moveNext () {
		while (super.moveNext()) {
			const val = super.current();
			if (this.filterFn(val, super.getIndex())) {
				this.filterIndex++;
				this.cache[this.filterIndex] = val;
				return true;
			}
		}
		
		return false;
	}
}
