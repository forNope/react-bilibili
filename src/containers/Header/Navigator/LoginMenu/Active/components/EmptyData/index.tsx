import * as React from "react";
import * as styles from "./styles.scss";

export const EmptyData: React.SFC = ({children}) => (
	<div className={styles["empty-data"]}>{children}</div>
);
