import * as React from "react";
import * as styles from "./styles.scss";

export const Slide: React.SFC = ({children}) => (
	<div className={styles.slide} data-role="slide">
		{children}
	</div>
);
