import {remove} from "@helps/array";

export class Timer {
	private timers: {
		[name: string]: {
			cbArr: Array<Function>;
			id: number;
		};
	} = {};
	
	public static cancelTiming (id: number) {
		window.clearTimeout(id);
		window.clearInterval(id);
		window.cancelAnimationFrame(id);
	}
	
	public register = (name: string, cb: Function) => {
		this.getTimer(name).cbArr.push(cb);
	}
	
	public unregister = (name: string, cb?: Function) => {
		const timer = this.getTimer(name);
		if (cb) {
			remove(timer.cbArr, cb);
		} else {
			this.stop(name);
			timer.cbArr = [];
		}
	}
	
	public setImmediate = (name: string, ...args: any[]) => {
		const timer = this.getTimer(name);
		this.stop(name);
		timer.cbArr.forEach((cb) => cb.apply(null, args));
	}
	
	public setTimeout = (name: string, time: number, ...args: any[]) => {
		const timer = this.getTimer(name);
		this.stop(name);
		timer.id = window.setTimeout(
			() => {
				timer.cbArr.forEach((cb) => cb.apply(null, args));
			},
			time,
		);
	}
	
	public setInterval = (name: string, interval: number, ...args: any[]) => {
		const timer = this.getTimer(name);
		this.stop(name);
		timer.id = window.setInterval(
			() => {
				timer.cbArr.forEach((cb) => cb.apply(null, args));
			},
			interval,
		);
	}
	
	public requestAnimationFrame = (name: string, ...args: any[]) => {
		const timer = this.getTimer(name);
		this.stop(name);
		timer.id = window.requestAnimationFrame(
			() => {
				timer.cbArr.forEach((cb) => cb.apply(null, args));
			},
		);
	}
	
	public stop = (name?: string) => {
		if (name) {
			Timer.cancelTiming(this.getTimer(name).id);
		} else {
			Object.keys(this.timers)
			      .forEach((key) => {
				      const timer = this.timers[key];
				      Timer.cancelTiming(timer.id);
			      });
		}
	}
	
	public getTimer = (name: string) => {
		if (!this.timers[name]) {
			this.timers[name] = {
				cbArr: [],
				id: 0,
			};
		}
		return this.timers[name];
	}
}
