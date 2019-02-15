import * as React from "react";
import * as styles from "./styles.scss";

interface IItemprops {
	className?: string;
}

export const Item: React.SFC<IItemprops> = ({
	                                            children,
	                                            className = "",
                                            }) => (
	<div className={`${styles.container} ${className}`}>
		{children}
	</div>
);
