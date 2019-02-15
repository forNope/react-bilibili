import * as React from "react";
import * as styles from "./styles.scss";

export const List: React.SFC = ({children}) => (
	<ul className={styles.list}>
		{children}
	</ul>
);
