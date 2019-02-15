import * as React from "react";
import * as styles from "./styles.scss";

export const Container: React.SFC = ({children}) => (
	<div className={styles.container}>
		{children}
	</div>
);
