import * as React from "react";
import * as styles from "./styles.scss";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export interface ITabItemProps {
	text: string;
	index?: number;
	selectText?: string;
	isSelect?: boolean;
	mouseEvents?: IMouseEvents;
	onClick?(): void;
	onMouseEnter?(): void;
	onMouseLeave?(): void;
	mode?: "click" | "hover";
	[key: string]: any;
}

export const TabItem: React.SFC<ITabItemProps> = ({
	text,
	index,
	selectText = text,
	isSelect,
	mouseEvents,
	onClick,
	onMouseEnter,
	mode = "click",
}) => {
	function emit(type: "onClick" | "onMouseEnter") {
		if (this[type]) {
			this[type]();
		}
	}

	return (
		<p
			data-role="tab-item"
			data-index={index}
			className={`${styles.tab} ${isSelect ? styles.on : ""}`}
			onClick={onClick}
		>
			{isSelect ? selectText : text}
		</p>
	);
};
