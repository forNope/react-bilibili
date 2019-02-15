import * as React from "react";
import * as ReactDOM from "react-dom";
import Loading from "@components/Loading";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {
	getScrollParent,
	isInViewport,
	on,
	off,
	emit,
	data, one,
} from "@helps/DOM";
import {throttle} from "@helps/performance";

export interface IDynamicLoadProps {
	height?: string;
	offset?: number;
	throttle?: number;
	once?: boolean;
	renderLoading?: React.ReactElement<any>;
}

@observer
export class DynamicLoad extends React.Component<IDynamicLoadProps> {
	public static defaultProps: IDynamicLoadProps = {
		throttle: 16.67,
		height: "100px",
		offset: 0,
	};
	
	private el: HTMLElement;
	private scrollableParent: HTMLElement;
	
	@observable
	private isInViewport = false;
	
	public startOb = () => {
		this.stopOb();
		if (this.props.once) {
			one(this.scrollableParent, "scroll", this.handleScroll);
		} else {
			on(this.scrollableParent, "scroll", this.handleScroll);
		}
	}
	
	public stopOb = () => {
		off(this.scrollableParent, "scroll", this.handleScroll);
	}
	
	public render () {
		return this.isInViewport
			? this.props.children
			: <Loading height={this.props.height}/>;
	}
	
	private handleScroll = throttle(
		() => {
			this.isInViewport = isInViewport(this.el);
		},
		this.props.throttle,
	);
	
	public updateEl = () => {
		this.el = ReactDOM.findDOMNode(this) as HTMLElement;
	}
	
	public componentDidUpdate () {
		this.updateEl();
	}
	
	public componentDidMount () {
		this.updateEl();
		this.scrollableParent = getScrollParent(this.el);
		this.handleScroll();
		this.startOb();
	}
	
	public componentWillUnmount () {
		this.stopOb();
	}
}
