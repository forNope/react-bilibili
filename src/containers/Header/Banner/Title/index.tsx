import * as React from "react";
import * as styles from "./styles.scss";

export const Title: React.SFC = () => (
	<a
		className={styles.title}
		href="#"
		data-ani={"fade"}
	>
		bilibili干杯🍻
	</a>
);
