import { IObserver } from "./";

export interface IObservable {
	attach(observer: IObserver | any, ...extend: any[]): void;
	detach(observer: IObserver | any, ...extend: any[]): void;
	notify(observer: IObserver | any, ...args: any[]): void;
	notifyAll(...args: any[]): void;
}
