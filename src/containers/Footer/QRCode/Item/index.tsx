import * as React from "react";
import * as styles from "./styles.scss";
import {ListItem} from "@containers/Footer/component";

interface IItemProps {
	text: string;
	href: string;
	backgroundPosition: string;
	code: string;
	isTwoCode?: boolean;
}

export const Item: React.SFC<IItemProps> = ({
	                                            text,
	                                            href,
	                                            backgroundPosition,
	                                            code,
	                                            isTwoCode,
                                            }) => (
	<ListItem href={href} className={styles.container}>
		<i className={styles.icon} style={{backgroundPosition}}/>
		<p className={styles.text}>{text}</p>
		<div className={`${styles["code-wrapper"]} ${isTwoCode ? styles.two : ""}`}>
			<i className={styles.arrow}/>
			<i className={styles["arrow-cover"]}/>
			<i className={styles.code} style={{backgroundImage: `url(${code})`}}/>
		</div>
	</ListItem>
);
