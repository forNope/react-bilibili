import * as React from "react";
import * as styles from "./styles.scss";

interface IPicProps {
	width: number;
	height: number;
	src: string;
	title: string;
}

export const Pic: React.SFC<IPicProps> = (props) => (
	<div className={styles.pic} data-role="pic">
		<img {...props}/>
	</div>
);
