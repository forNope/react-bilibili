import * as React from "react";
import * as cssModules from "react-css-modules";
import * as styles from "./styles.scss";
import {ISerialProps} from "@homeComponents/Rank/interface";

export const SerialNum: React.SFC<ISerialProps> = ({
	                                                   num,
                                                   }) => (
	<p className={`${styles.serial} ${num <= 3 ? styles.hot : null}`}>
		{num}
	</p>
);
