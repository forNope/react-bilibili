import * as React from "react";
import * as styles from "./styles.scss";

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

export class ScrollBar extends React.Component<IScrollBarProps> {
	private handleWheel = () => {
		console.log("wheel");
	}

	public render() {
		return (
			<div
				className={styles["scroll-bar-box"]}
				onWheel={this.handleWheel}
				style={{ height: this.props.height }}
			>
				<div>
					{this.props.children}
				</div>
				<div className={styles["scroll-bar"]} />
			</div>
		);
	}
}