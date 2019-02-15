import * as React from "react";
import * as styles from "./styles.scss";

export const Title: React.SFC = ({children}) => (
	<p className={styles.title}>{children}</p>
);
