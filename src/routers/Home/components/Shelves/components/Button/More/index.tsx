import * as React from "react";
import * as styles from "./styles.scss";

export interface IMoreProps {
	href?: string;
}

export const More: React.SFC<IMoreProps> = ({ href = "javascript: void(0)" }) => (
	<a
		className={styles.more}
		href={href}
	>
		<i className={styles.icon} />
		<span className={styles.text}>更多</span>
	</a>
);
