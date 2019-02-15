import {link} from "@helps/string";
import {isObject} from "@helps/types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {addClass, off, on, one, removeClass} from "@helps/DOM";

interface ITransitionProps {
	durationMs?: number | { enter?: number, leave?: number };
	style?: { [key: string]: string };
	name: string | {
		enter: string;
		enterActive: string;
		leave: string;
		leaveActive: string;
	};
	enableEnter?: boolean;
	enableLeave?: boolean;
}

export class Transition extends React.Component<ITransitionProps> {
	public static displayName = "Transition";
	
	private el: HTMLElement;
	
	private getClassName (type:
		                      "enter" | "enterActive"
		                      | "leave" | "leaveActive") {
		const {style} = this.props;
		let className,
		    name = this.props.name;
		
		if (isObject(name)) {
			className = (name as any)[type];
		} else {
			name = name + "-" + link(type);
			className = style ? style[name] : name;
		}
		
		return className;
	}
	
	public render () {
		return this.props.children;
	}
	
	public componentDidMount () {
		this.el = ReactDOM.findDOMNode(this) as HTMLElement;
		const enter       = this.getClassName("enter"),
		      enterActive = this.getClassName("enterActive");
		
		addClass(this.el, enter);
		setTimeout(() => {
			removeClass(this.el, enter);
			addClass(this.el, enterActive);
			one(this.el, "transitionend", () => {
				removeClass(this.el, enterActive);
			});
		});
	}
}
