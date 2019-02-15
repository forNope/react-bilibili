import * as React from "react";
import * as styles from "./styles.scss";

interface IStateProps {
	text: string;
	isActive?: boolean;
	href?: string;
}

export const State: React.SFC<IStateProps> = ({
	                                              text,
	                                              isActive,
	                                              href,
                                              }) =>
	href
		? (
			<a
				className={`${styles.state} ${isActive ? styles.active : ""}`}
				href={href}
			>
				{text}
			</a>
		)
		: (
			<span className={`${styles.state} ${isActive ? styles.active : ""}`}>
				{text}
			</span>
		);
