import {FilterIterator} from "./FilterIterator";
import {IEachFn, IFilterFn} from "../interface";
import {Iterator} from "../../Iterator";
import {ArrayLikeSequence} from "../ArrayLikeSequence";

interface IHook {
	value: any;
	index: number;
}

export class FilteredSequence extends ArrayLikeSequence {
	public filterFn: IFilterFn;
	private iterator: FilterIterator;
	private cache: Array<any> = [];
	
	constructor (parent: ArrayLikeSequence, filterFn: IFilterFn) {
		super(parent);
		this.filterFn = filterFn;
	}
	
	public getIterator (): FilterIterator {
		if (!this.iterator) {
			this.iterator = new FilterIterator(this, this.filterFn);
		}
		
		return this.iterator;
	}
	
	public get (index: number) {
		const cache = this.cache;
		
		if (cache[index]) {
			return cache[index];
		} else {
			const iterator = this.getIterator();
			
			while (iterator.moveNext()) {
				const i = iterator.getIndex();
				
				cache[i] = iterator.current();
				if (i === index) {
					return cache[i];
				}
			}
		}
	}
}
