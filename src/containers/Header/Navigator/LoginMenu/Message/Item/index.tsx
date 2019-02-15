import * as React from "react";
import * as styles from "./styles.scss";

interface IItemProps {
	href?: string;
	text: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            children,
	                                            href = "#",
	                                            text,
                                            }) => (
	<a href={href} className={styles.container}>
		{text}
		{children}
	</a>
);
