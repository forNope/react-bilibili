import * as React from "react";
import * as styles from "./styles.scss";
import { inRange } from "@helps/number";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export interface ITabsProps {
	className?: string;
	style?: React.CSSProperties;
	textArr: string[];
	selectTextArr?: string[];
	mode?: "click" | "hover";
	cb?(index: number): void;
}

@observer
export class Tabs extends React.Component<ITabsProps> {
	public static defaultProps: ITabsProps = {
		className: "",
		mode: "click",
		textArr: [],
	};

	constructor(props: ITabsProps) {
		super(props);
	}

	private selectTextArr = this.props.selectTextArr || this.props.textArr;

	@observable private index: number = 0;

	@action public setIndex = (index: number) => {
		this.index = index;
	}

	public handleEvent = (e: React.MouseEvent<HTMLElement>) => {
		const index = +e.currentTarget.dataset.index,
			cb = this.props.cb;

		this.setIndex(index);
		if (cb) {
			cb(index);
		}
	}

	private mouseEvents: IMouseEvents = this.props.mode === "click"
		? {
			onClick: this.handleEvent,
		}
		: {
			onMouseEnter: this.handleEvent,
		};

	public componentWillReceiveProps(nextProps: ITabsProps) {
		this.selectTextArr = nextProps.selectTextArr || nextProps.textArr;
	}

	public render() {
		const { className, textArr, selectTextArr = textArr, mode, style } = this.props;

		return (
			<div
				className={styles.container + " " + className}
				style={style}
			>
				{textArr.map((text, i) => (
					<p
						data-role="tab-item"
						data-index={i}
						key={i}
						className={`${styles.tab} ${this.index === i ? styles.on : ""}`}
						{...this.mouseEvents}
					>
						{this.index === i ? this.selectTextArr[i] : textArr[i]}
					</p>
				))}
			</div>
		);
	}
}
