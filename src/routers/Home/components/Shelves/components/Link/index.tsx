import * as React from "react";
import * as styles from "./styles.scss";

export interface ILinkProps {
	text?: string;
	href?: string;
	hasIcon?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

export const Link: React.SFC<ILinkProps> = ({
	                                            text,
	                                            href = "javascript: void(0)",
	                                            hasIcon = false,
	                                            style,
	                                            className = "",
                                            }) => (
	<a
		className={`${className} ${hasIcon ? styles.offset : ""} ${styles.link}`}
		style={style}
		href={href}
	>
		{hasIcon ? <i className={styles.icon}/> : null}
		{text}
	</a>
);
