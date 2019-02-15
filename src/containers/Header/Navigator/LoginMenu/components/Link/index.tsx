import * as React from "react";
import * as styles from "./styles.scss";
import {Item} from "../";

interface ILinkProps {
	text: string;
	href?: string;
}

export const Link: React.SFC<ILinkProps> = ({
	                                            children,
	                                            text,
	                                            href,
                                            }) => (
	<Item className={styles.container}>
		<a className={styles.box} href={href}>
			<div className={`${styles.text} ${href ? styles.link : ""}`}>{text}</div>
			<div>
				{children}
			</div>
		</a>
	</Item>
);
