import * as React from "react";
import * as styles from "./styles.scss";
import {Item} from "./Item";

export const Upload: React.SFC = () => (
	<div className={styles.container}>
		<Item text={"测试"} position={"-534px -919px"}/>
		<Item text={"测试"} position={"-534px -983px"}/>
		<Item text={"测试"} position={"-471px -919px"}/>
		<Item text={"测试"} position={"-471px -982px"}/>
		<Item text={"测试"} position={"-471px -1751px"}/>
	</div>
);
