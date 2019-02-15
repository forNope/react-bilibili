import * as React from "react";
import * as styles from "./styles.scss";

export const WatchLater: React.SFC<{ className?: string }> = ({className}) => (
	<div className={styles["watch-later"] + " " + className}/>
);
