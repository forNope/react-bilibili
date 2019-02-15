import {Sequence} from "@helps/lazy/Sequence";

export class Iterator {
	protected sequence: Sequence;
	protected index = -1;
	
	constructor (sequence: Sequence) {
		this.sequence = sequence;
	}
	
	public current () {
		return this.sequence.parent.get(this.index);
	}
	
	public moveNext () {
		if (this.index >= this.sequence.parent.length() - 1) {
			return false;
		}
		
		this.index++;
		
		return true;
	}
	
	public getIndex (): number {
		return this.index;
	}
}
