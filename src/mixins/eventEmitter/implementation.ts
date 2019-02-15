import {clean} from "@helps/array";
import {includes} from "@helps/array/includes";
import {isEmpty} from "@helps/string";
import {
	isString,
	isObject,
	isFunction,
	isArray,
} from "@helps/types";
import {
	IEventEmitter,
	IListeners,
} from "./interface";

let globalListeners: IListeners = {};

export class EventEmitter implements IEventEmitter {
	__EventEmitterListeners: IListeners;
	
	on (types: string, listener: EventListener) {
		if (listener) {
			const listeners = this.__EventEmitterListeners || globalListeners;
			clean(types.split(" "), "")
				.forEach((type) => {
					if (!listeners[type]) {
						listeners[type] = [];
					}
					
					if (!includes(listeners[type], listener)) {
						listeners[type].push(listener);
					}
				});
		}
		return this;
	}
	
	off (types?: string, listener?: EventListener) {
		const listeners = this.__EventEmitterListeners || globalListeners;
		if (types) {
			clean(types.split(" "), "")
				.forEach((type) => {
					if (listeners[type] && listener) {
						let index = listeners[type].indexOf(listener);
						while (~index) {
							listeners[type].splice(index, 1);
							index = listeners[type].indexOf(listener);
						}
					} else {
						listeners[type] = [];
					}
				});
		} else {
			if (this.__EventEmitterListeners) {
				this.__EventEmitterListeners = {};
			} else {
				globalListeners = {};
			}
		}
		
		return this;
	}
	
	one (types: string, listener: EventListener) {
		if (listener) {
			const listeners = this.__EventEmitterListeners || globalListeners,
			      cb        = (...args: any[]) => {
				      listener.apply(this, args);
				      this.off(types, cb);
			      };
			this.on(types, cb);
		}
		return this;
	}
	
	emit (types: string, ...args: any[]) {
		const listeners = this.__EventEmitterListeners || globalListeners;
		
		clean(types.split(" "), "")
			.forEach((type) => {
				if (listeners[type]) {
					listeners[type].forEach((listener) => {
						listener.apply(this, args);
					});
				}
			});
		
		return this;
	}
	
	emitAll (...args: any[]) {
		const listeners = this.__EventEmitterListeners || globalListeners;
		Object
			.keys(listeners)
			.forEach((key) => {
				this.emit(key);
			});
		
		return this;
	}
}
