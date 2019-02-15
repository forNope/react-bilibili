import * as React from "react";
import * as styles from "./styles.scss";
import {Item} from "./Item";

export const Message: React.SFC = () => (
	<div className={styles.container}>
		<Item text={"回复我的"}/>
		<Item text={"@我的"}/>
		<Item text={"收到的赞"}/>
		<Item text={"系统通知"}/>
		<Item text={"我的消息"}/>
	</div>
);
