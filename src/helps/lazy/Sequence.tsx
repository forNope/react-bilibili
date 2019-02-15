import {FilteredSequence} from "@helps/lazy/Array/filter/FilteredSequence";
import {IEachFn, IFilterFn, IMapFn} from "@helps/lazy/Array/interface";
import {Iterator} from "@helps/lazy/Iterator";
import {MappedSequence} from "./Array/map/MappedSequence";

export abstract class Sequence {
	public parent: any;
	
	constructor (parent: any) {
		this.parent = parent;
	}
	
	public length (): number {
		return this.parent.length();
	}
	
	abstract get (...args: any[]): any;
	
	public getIndex () {
		return this;
	}
	
	public getIterator (): Iterator {
		return new Iterator(this);
	}
	
	abstract each (fn: IEachFn): any;
	
	abstract take (length: number): Array<any>;
}
