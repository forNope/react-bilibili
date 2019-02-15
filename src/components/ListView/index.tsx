import * as React from "react";
import * as styles from "./styles.scss";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { ScrollBar } from "../ScrollBar/test";

export interface IListViewProps {
	offset: number;
	onePageItems: number;
	wrapperClassName?: string;
	containerClassName?: string;
	children?: React.ReactNode;
}

@observer
export default class ListView extends React.Component<IListViewProps>  {
	public static defaultProps: IListViewProps = {
		offset: 20,
		onePageItems: 10,
		wrapperClassName: "",
		containerClassName: "",
	};

	private test = Array(100).fill(null).map((_, i) => <p key={i}>test</p>);

	@observable private index = 0;
	private childrens = React.Children.toArray(this.props.children);

	@action private setIndex = (index: number) => this.index = index;

	private handleWheel = (el: HTMLElement, scrollTop: number) => {
		this.setIndex(Math.floor(scrollTop / this.props.offset));
	}

	@observable private paddingTop = 0;

	private containerHeight = this.props.offset * this.childrens.length + "px";

	private showHeight = "300px";

	public render() {
		return (
			<ScrollBar
				autoHide
				showHeight={this.showHeight}
				height={this.containerHeight}
				onWheel={this.handleWheel}
			>
				{/*this.childrens.slice(this.index, this.index + this.props.onePageItems)*/}
				{this.test.slice(this.index, this.index + this.props.onePageItems)}
			</ScrollBar>
		);
	}

	public componentWillReceiveProps(props: IListViewProps) {
		this.childrens = React.Children.toArray(props.children);
		this.containerHeight = this.props.offset * this.childrens.length + "px";
	}
}
