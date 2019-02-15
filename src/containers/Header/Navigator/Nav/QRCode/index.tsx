import * as React from "react";
import * as styles from "./styles.scss";

export const QRCode: React.SFC = () => (
	<div className={styles["qr-container"]}>
		<div className={styles["qr-code"]}/>
	</div>
);
