import * as React from "react";
import * as styles from "./styles.scss";

export const Container: React.SFC = (props: any) => {
	const {children, ...properties} = props;
	return (
		<div className={styles.container} {...properties}>{children}</div>
	);
}
