import * as React from "react";
import * as styles from "./styles.scss";

export const GrayMoreBtn: React.SFC<{ href?: string }> = ({href = "javascript: void(0)"}) => (
	<a className={styles["zone-rank-more"]} href={href}>查看更多</a>
);
