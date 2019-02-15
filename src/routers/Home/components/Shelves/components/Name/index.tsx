import * as React from "react";
import * as styles from "./styles.scss";

export interface INameProps {
	text?: string;
	href?: string;
	small?: boolean;
}

export const Name: React.SFC<INameProps> = ({
	                                            text,
	                                            href,
	                                            small,
                                            }) => {
	const eleStyle = `${small ? styles.small : ""} ${styles.name} ${href ? styles.link : ""}`;
	return href
		? <a className={eleStyle} href={href}>{text}</a>
		: <p className={eleStyle}>{text}</p>;
};
