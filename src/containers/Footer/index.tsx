import * as React from "react";
import * as styles from "./styles.scss";
import {AboutUs} from "@containers/Footer/AboutUs";
import {Helps} from "@containers/Footer/Helps";
import {QRCode} from "@containers/Footer/QRCode";

export const Footer: React.SFC = () => (
	<div className={styles.footer}>
		<div className="app-wrapper">
			<div className={styles.helps}>
				<AboutUs/>
				<Helps/>
				<QRCode/>
			</div>
		</div>
	</div>
);
