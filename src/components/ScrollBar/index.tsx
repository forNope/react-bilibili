import * as React from "react";
import * as ReactDOM from "react-dom";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {getDimension} from "@helps/DOM";

export type cb = (el: HTMLElement, scrollTop: number) => void;

export interface IScrollBarProps {
	onMouseEnter?: cb;
	onMouseLeave?: cb;
	onWheel?: cb;
	height?: string;
	showWidth?: string;
	showHeight?: string;
	autoHide?: boolean;
}

@observer
export default class ScrollBar extends React.Component<IScrollBarProps> {
	public static defaultProps: IScrollBarProps = {
		showWidth: "100%",
		showHeight: "100%",
		height: "auto",
	};
	
	private contentEl: HTMLElement;
	private scrollBarBoxEl: HTMLElement;
	private scrollBarEl: HTMLElement;
	
	private scrollBarTopAsDecimal = 0;
	private scrollTop = 0;
	
	@observable
	private scrollBarHeight = 0;
	
	@observable
	private isHiddenScrollBar = this.props.autoHide;
	
	private handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
		if (this.props.autoHide) {
			this.scrollBarBoxEl.style.opacity = "1";
		}
		
		this.emit("enter", this.contentEl.scrollTop);
	}
	
	private handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
		if (this.props.autoHide) {
			this.scrollBarBoxEl.style.opacity = "0";
		}
		
		this.emit("leave", this.contentEl.scrollTop);
	}
	
	private handleWheel = (e: React.WheelEvent<HTMLElement>) => {
		const scrollTop = e.currentTarget.scrollTop;
		this.scrollTop = scrollTop;
		this.scrollBarEl.style.top = scrollTop / getDimension(this.contentEl).height * 100 + "%";
		this.emit("wheel", scrollTop);
	}
	
	private emit = (type: "enter" | "leave" | "wheel", scrollTop: number) => {
		switch (type) {
			case "enter":
				if (this.props.onMouseEnter) {
					this.props.onMouseEnter(this.contentEl, scrollTop);
				}
				break;
			case "leave":
				if (this.props.onMouseLeave) {
					this.props.onMouseLeave(this.contentEl, scrollTop);
				}
				break;
			case "wheel":
				if (this.props.onWheel) {
					this.props.onWheel(this.contentEl, scrollTop);
				}
				break;
		}
	}
	
	public render () {
		return (
			<div
				className={`${styles["outer-container"]}`}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				style={{
					width: this.props.showWidth,
					height: this.props.showHeight,
				}}
			>
				<div
					className={styles["inner-container"]}
					onWheel={this.handleWheel}
				>
					<div
						className={styles.content}
						style={{height: this.props.height}}
						ref={(el) => this.contentEl = el}
					>
						{this.props.children}
					</div>
				</div>
				<div
					className={styles["scroll-bar-box"]}
					ref={(el) => this.scrollBarBoxEl = el}
				>
					<div
						className={styles["scroll-bar"]}
						ref={(el) => this.scrollBarEl = el}
					/>
				</div>
			</div>
		);
	}
	
	public componentDidMount () {
		const containerHeight = getDimension(ReactDOM.findDOMNode(this) as HTMLElement).height,
		      proportion      = getDimension(this.contentEl).height / containerHeight;
		this.scrollBarEl.style.height = containerHeight / proportion + "px";
	}
}
