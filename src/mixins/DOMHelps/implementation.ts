import {
	addClass,
	addStyle,
	attr,
	enterFullScreen,
	exitFullScreen,
	isFullScreen,
	fullScreenChange,
	getDimension,
	getMousePos,
	getOffset,
	getProportion,
	hasAttr,
	hasClass,
	hasStyle,
	isDOM,
	isInViewport,
	removeAttr,
	removeClass,
	removeStyle,
	setClass,
	setStyle,
	toggleClass,
	toggleStyle,
	on,
	off,
	one,
	emit,
} from "@helps/DOM";
import {IDOMHelps} from "@mixins/DOMHelps/interface";
import * as React from "react";

const mount = {
	setClass,
	addClass,
	removeClass,
	hasClass,
	toggleClass,
	setStyle,
	addStyle,
	removeStyle,
	hasStyle,
	toggleStyle,
	attr,
	hasAttr,
	removeAttr,
	getDimension,
	getMousePos,
	getOffset,
	getProportion,
	isInViewport,
	on,
	off,
	one,
	emit,
	enterFullScreen,
	exitFullScreen,
	isFullScreen,
	fullScreenChange,
};

export class DOMHelps {}

Object.getOwnPropertyNames(mount)
      .forEach((name) => {
	      (DOMHelps.prototype as any)[name] = function (...args: any[]) {
		      if (isDOM(this)) {
			      args.unshift(this);
		      } else if (isDOM(args[args.length - 1])) {
			      args.unshift(args.pop());
		      } else {
			      throw new Error("cannot find HTMLElement");
		      }
		
		      return (mount as any)[name].apply(this, args);
	      };
      });
