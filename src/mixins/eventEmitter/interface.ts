export type IListeners = { [type: string]: Array<EventListener> };

export interface IEventEmitter {
	on? (types: string, listener: Function): this;
	
	off? (types?: string, listener?: Function): this;
	
	one? (types: string, listener: Function): this;
	
	emit? (types: string, ...args: any[]): this;
	
	emitAll? (...args: any[]): this;
}
