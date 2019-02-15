import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

interface IHoverLoadProps {
	// default parent Element
	mountEl?: HTMLElement;
	// if set false, it will only render it when hover mountEl
	isAlwaysRender?: boolean;
	animation?: {
		enter?: React.CSSProperties;
		leave?: React.CSSProperties;
	};
}

@observer
export class HoverLoad extends React.Component<IHoverLoadProps> {
	public static defaultProps = {
		isAlwaysRender: false,
	};
	
	@observable
	private load = false;
	
	private mountEl = this.props.mountEl;
	
	public isLoaded = () => this.load;
	
	@action
	private setLoadState = (isLoad: boolean) => {
		if (isLoad && this.props.isAlwaysRender) {
			this.detach();
		}
		this.load = isLoad;
	}
	
	private mount = () => this.setLoadState(true);
	
	private unmount = () => this.setLoadState(false);
	
	private attach = () => {
		this.mountEl.addEventListener(
			"mouseenter",
			this.mount,
			false,
		);
		this.mountEl.addEventListener(
			"mouseleave",
			this.unmount,
			false,
		);
	}
	
	private detach = () => {
		this.mountEl.removeEventListener(
			"mouseenter",
			this.mount,
			false,
		);
		this.mountEl.removeEventListener(
			"mouseleave",
			this.unmount,
			false,
		);
	}
	
	public render () {
		return this.load ? this.props.children : <div/>;
	}
	
	public componentDidMount () {
		if (!this.mountEl) {
			this.mountEl = ReactDOM.findDOMNode(this).parentElement;
		}
		this.attach();
	}
	
	public componentWillUnmount () {
		this.detach();
	}
}
