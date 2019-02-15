import * as React from "react";
import * as styles from "./styles.scss";

export const Title: React.SFC = ({children}) => (
	<div className={styles.title} data-role="title">
		{children}
	</div>
);
