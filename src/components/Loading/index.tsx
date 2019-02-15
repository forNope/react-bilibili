import * as React from "react";
import * as styles from "./styles.scss";
import * as loadingImg from "@assets/loading.gif";

const Loading: React.SFC<{ height?: string; }> = ({height}) => (
	<div className={styles.loading} style={{height}}>
		<p className={styles.text}>Loading...</p>
	</div>
);

export default Loading;
