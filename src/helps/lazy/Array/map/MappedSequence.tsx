import {IEachFn, IFilterFn, IMapFn} from "@helps/lazy/Array/interface";
import {ArrayLikeSequence} from "../ArrayLikeSequence";

export class MappedSequence extends ArrayLikeSequence {
	private mapFn: IMapFn;
	
	constructor (parent: ArrayLikeSequence, mapFn: IMapFn) {
		super(parent);
		this.mapFn = mapFn;
	}
	
	public get (index: number) {
		return this.mapFn(this.parent.get(index), index);
	}
}
