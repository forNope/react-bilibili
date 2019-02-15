import * as React from "react";
import * as styles from "./styles.scss";

export const Mask: React.SFC = (props) => {
	const {children, ...properties} = props;
	return (
		<div className={styles.mask} {...properties} data-role="mask">
			{children}
		</div>
	);
};
