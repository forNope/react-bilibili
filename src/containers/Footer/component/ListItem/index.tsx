import * as React from "react";
import * as styles from "./styles.scss";

interface IListItemProps {
	href: string;
	className?: string;
}

export const ListItem: React.SFC<IListItemProps> = ({
	                                                    children,
	                                                    href,
	                                                    className = "",
                                                    }) => (
	<li className={`${styles.item} ${className}`}>
		<a href={href}>{children}</a>
	</li>
);
