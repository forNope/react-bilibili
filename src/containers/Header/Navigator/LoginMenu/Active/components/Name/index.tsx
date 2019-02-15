import * as React from "react";
import * as styles from "./styles.scss";

interface INameProps {
	text: string;
	href?: string;
}

export const Name: React.SFC<INameProps> = ({text, href}) =>
	href
		? <a href={href} className={styles.name} data-role="name">{text}</a>
		: <span className={styles.name} data-role="name">{text}</span>;
