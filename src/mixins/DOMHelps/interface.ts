import * as React from "react";

export interface IDOMHelps {
	setClass (className: string, el?: HTMLElement): this;
	
	addClass (className: string, el?: HTMLElement): this;
	
	removeClass (className: string, el?: HTMLElement): this;
	
	hasClass (className: string, el?: HTMLElement): boolean;
	
	toggleClass (className: string, el?: HTMLElement): this;
	
	setStyle (style: React.CSSProperties | string, el?: HTMLElement): this;
	
	addStyle (style: React.CSSProperties | string, el?: HTMLElement): this;
	
	removeStyle (style: string, el?: HTMLElement): this;
	
	hasStyle (style: string, el?: HTMLElement): boolean;
	
	toggleStyle (style: React.CSSProperties | string, el?: HTMLElement): this;
	
	attr (property: string, value?: string | HTMLElement, el?: HTMLElement): this | string;
	
	removeAttr (property: string, el?: HTMLElement): this;
	
	hasAttr (property: string, el?: HTMLElement): boolean;
	
	enterFullScreen (el?: HTMLElement): this;
	
	exitFullScreen (el?: HTMLElement): this;
	
	fullScreenChange (listener: EventListener, el?: HTMLElement): this;
	
	isFullScreen (el?: HTMLElement): boolean;
	
	getDimension (el?: HTMLElement): { width: number, height: number };
	
	getMousePos (el?: HTMLElement): number;
	
	getOffset (el?: HTMLElement): { top: number, left: number };
	
	getProportion (elContainer: HTMLElement,
	               widthOrHeight: "width" | "height",
	               unit?: "decimal" | "percent",
	               el?: HTMLElement): number;
	
	isInViewport (el?: HTMLElement): boolean;
	
	on (type: string, listener: EventListener, el?: Node): this;
	
	off (type?: string, listener?: EventListener, el?: Node): this;
	
	one (type: string, listener: EventListener, el?: Node): this;
	
	emit (type?: string, el?: Node): this;
}
