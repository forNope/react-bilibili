import * as React from "react";
import * as styles from "./styles.scss";

interface IDescProps {
	text: string;
	href?: string;
}

export const Desc: React.SFC<IDescProps> = ({
	                                            text,
	                                            href,
                                            }) =>
	href
		? (
			<a
				className={`${styles.desc} ${styles.active}`}
				href={href}
			>
				{text}
			</a>
		)
		: (
			<span className={styles.desc}>
				{text}
			</span>
		);
