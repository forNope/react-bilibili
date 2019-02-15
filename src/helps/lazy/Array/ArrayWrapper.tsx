import {IEachFn, IFilterFn, IMapFn} from "@helps/lazy/Array/interface";
import {Iterator} from "@helps/lazy/Iterator";
import {ArrayLikeSequence} from "./ArrayLikeSequence";

export class ArrayWrapper extends ArrayLikeSequence {
	public source: Array<any>;
	private callTimes = 0;
	
	constructor (source: Array<any>) {
		super();
		this.parent = this;
		this.source = source;
	}
	
	public get (index: number) {
		console.log("source:", ++this.callTimes);
		return this.source[index];
	}
	
	public length () {
		return this.source.length;
	}
}
