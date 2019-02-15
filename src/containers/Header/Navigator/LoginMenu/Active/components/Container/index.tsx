import * as React from "react";
import * as styles from "./styles.scss";

interface IContainerProps {
	height?: string;
}

export const Container: React.SFC<IContainerProps> = ({
	                                                      children,
	                                                      height = "56px",
                                                      }) => (
	<div className={styles.container} style={{height}}>
		{children}
	</div>
);
