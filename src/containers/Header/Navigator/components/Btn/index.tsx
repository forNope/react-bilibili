import * as React from "react";
import * as styles from "./styles.scss";

interface IBtnProps {
	text: string;
	className?: string;
	href?: string;
	hasIcon?: boolean;
}

export const Btn: React.SFC<IBtnProps> = ({
	                                          text,
	                                          className = "",
	                                          href = "#",
	                                          hasIcon = true,
                                          }) => (
	<a
		className={`${styles.container} ${className}`}
		href={href}
	>
		{text}
		{hasIcon ? <i className={styles.icon}/> : null}
	</a>
);
