import {eachPush} from "@helps/array";
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import * as styles from "./styles.scss";

export interface IScrollViewProps {
	containerClassName?: string;
	children?: React.ReactNode;
}

@observer
export default class ScrollView extends React.Component<IScrollViewProps> {
	public static displayName = "ScrollView";
	
	public static defaultProps = {
		containerClassName: "",
	};
	
	private children = React.Children.toArray(this.props.children);
	private childrenLength = this.children.length;
	
	// use ref get the native dom, when index has change,
	// direct to update elements left style property
	private scrollEle: HTMLElement;
	private renderElements: Array<ReactElement> = new Array(React.Children.count(this.props.children)).fill(null);
	
	@observable
	private index: number = 0;
	
	private setPosition () {
		this.scrollEle.style.left = -this.index * 100 + "%";
	}
	
	public scrollToNext () {
		if (this.index === this.childrenLength - 1) {
			this.index = 0;
		} else {
			this.index += 1;
		}
		this.setPosition();
	}
	
	public scrollToPrevious () {
		if (this.index === 0) {
			this.index = this.childrenLength - 1;
		} else {
			this.index -= 1;
		}
		this.setPosition();
	}
	
	public scrollToIndex (index: number) {
		if (index >= this.childrenLength || index < 0) {
			throw new Error(`scroll index' range must in 0 to ${this.childrenLength - 1}`);
		}
		
		this.index = index;
		this.setPosition();
	}
	
	public getIndex (): number {
		return this.index;
	}
	
	public componentWillReceiveProps (nextProps: IScrollViewProps) {
		const children = React.Children.toArray(nextProps.children),
		      length   = children.length;
		
		this.children = children;
		this.childrenLength = length;
		this.renderElements.length = length;
	}
	
	public render () {
		const index           = this.index,
		      targetEle       = this.renderElements[index],
		      latestTargetEle = this.children[index];
		
		if (!targetEle || targetEle !== latestTargetEle) {
			this.renderElements[index] = latestTargetEle;
		}
		
		return (
			<div
				className={styles["scroll-view"]}
				ref={(ele) => this.scrollEle = ele}
				style={{width: this.childrenLength * 100 + "%", left: 0}}
			>
				{this.renderElements.map((ele, i: number) => (
					ele ? ele : <div key={i}/>
				))}
			</div>
		);
	}
}
