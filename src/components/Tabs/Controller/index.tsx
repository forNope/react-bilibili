import {off, on} from "@helps/DOM";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {deepClone} from "@helps/object";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {isFunction} from "@helps/types";
import {deepEach, deepMap, getOriginEl, mergeProps} from "@helps/React";

function isTab (node: React.ReactElement<any>) {
	return isFunction(node.type) && (node.type as any).role === "tab";
}

function isTabPanel (node: React.ReactElement<any>) {
	return isFunction(node.type) && (node.type as any).role === "tab-panel";
}

interface ITabsProps {
	selectedCb? (index: number): void;
	
	className?: string;
	children: any;
	
	[key: string]: any;
}

@observer
export class Tabs extends React.Component<ITabsProps> {
	public static defaultProps = {
		className: "",
	};
	
	@observable
	private index = 0;
	
	private el: HTMLElement;
	
	private tabElements: Array<React.ReactChild> = [];
	private tabPanelElements: Array<React.ReactChild> = [];
	
	constructor (props: ITabsProps) {
		super(props);
		this.attachIndex(props.children);
	}
	
	@action
	private handleClick = (e: MouseEvent) => {
		const target       = e.target as HTMLElement,
		      {selectedCb} = this.props;
		if (target.hasAttribute("data-tabindex")) {
			this.index = +target.dataset.tabindex;
			if (selectedCb) {
				selectedCb(this.index);
			}
		}
	}
	
	private attachIndex = (children: React.ReactChildren) => {
		let tabIndex      = -1,
		    tabPanelIndex = -1;
		
		deepEach(children, (child: React.ReactElement<any>) => {
			if (isTab(child)) {
				this.tabElements[++tabIndex] = child;
			} else if (isTabPanel(child)) {
				this.tabPanelElements[++tabPanelIndex] = child;
			}
		});
	}
	
	public getChildren = () => {
		let tabIndex = -1;
		return deepMap(this.props.children, (child: any) => {
			if (isTab(child)) {
				const el = mergeProps(child, {isSelect: this.tabElements.indexOf(child) === this.index});
				return mergeProps(getOriginEl(el), {"data-tabindex": ++tabIndex});
			} else if (isTabPanel(child)
				&& this.tabPanelElements.indexOf(child) !== this.index) {
				return;
			}
			return child;
		});
	}
	
	public componentWillUpdate (nextProps: ITabsProps) {
		this.attachIndex(nextProps.children);
	}
	
	public render () {
		const {className, selectedCb, children, ...properties} = this.props;
		return this.getChildren();
	}
	
	public componentDidMount () {
		this.el = ReactDOM.findDOMNode(this) as HTMLElement;
		on(this.el, "click", this.handleClick);
	}
	
	public componentWillUnmount () {
		off(this.el, "click", this.handleClick);
	}
}
