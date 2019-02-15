import * as React from "react";
import * as styles from "./styles.scss";

export const Icon: React.SFC<{ backgroundPosition?: string }> = ({backgroundPosition = ""}) => (
	<i
		className={styles.icon}
		style={{backgroundPosition}}
	/>
);
