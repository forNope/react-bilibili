import * as React from "react";
import * as styles from "./styles.scss";
import {Link} from "../";
import {Btn} from "@containers/Header/Navigator/components";

interface IContainerProps {
	width?: string;
	height?: string;
	className?: string;
	more?: {
		text?: string;
		href?: string;
		hasIcon?: boolean;
	};
}

export const Container: React.SFC<IContainerProps> = ({
	                                                      children,
	                                                      width = "320px",
	                                                      height = "auto",
	                                                      className = "",
	                                                      more,
                                                      }) => (
	<div
		style={{width, height}}
		className={`${styles.container} ${className}`}
		data-role="append"
	>
		{React.Children.count(children) === 0
			?
			(
				<div className={styles.empty}>
					<Link text={"列表里面空空如也"}/>
				</div>
			)
			: children}
		{more
			? (
				<div className={styles.btn}>
					<Btn
						text={more.text || "查看更多"}
						href={more.href || "#"}
						hasIcon={more.hasIcon}
					/>
				</div>
			)
			: null}
	</div>
);
