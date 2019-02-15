import * as React from "react";
import * as styles from "./styles.scss";

interface IInfoContainer {
	href?: string;
}

export const InfoContainer: React.SFC<IInfoContainer> = ({
	                                                         children,
	                                                         href,
                                                         }) =>
	href
		? (
			<a href={href} className={`${styles["info-container"]} ${styles.link}`}>
				{children}
			</a>
		)
		: (
			<div className={styles["info-container"]}>
				{children}
			</div>
		);
