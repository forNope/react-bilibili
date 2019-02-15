import * as React from "react";
import * as styles from "./styles.scss";

export const Split: React.SFC = ({children}) => (
	<div className={styles.split}>
		<div className={styles.tag}>{children}</div>
	</div>
);
