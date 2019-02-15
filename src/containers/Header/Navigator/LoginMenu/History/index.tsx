import * as React from "react";
import * as styles from "./styles.scss";
import {Item} from "./Item";
import {randomString} from "@helps/random";
import {Btn} from "@containers/Header/Navigator/components";
import {Container} from "@containers/Header/Navigator/LoginMenu/components";

export const History: React.SFC = () => (
	<Container width={"400px"} more={{hasIcon: true}}>
		<div className={styles["title-box"]}>
			<span className={styles.title}>今日</span>
			<div className={styles.split}/>
		</div>
		<Item text={"测试"} progress={10} part={2} device={"pc"}/>
		<Item text={"测试"} progress={10} part={2} device={"mobile"}/>
		<Item text={randomString()} progress={10} part={2} device={"pc"}/>
		<Item text={randomString()} progress={10} part={2} device={"mobile"}/>
		<Item text={randomString()} progress={10} part={2} device={"pc"}/>
		<Item text={randomString()} progress={10} part={2} device={"mobile"}/>
		<Item text={randomString()} progress={10} part={2} device={"pc"}/>
		<Item text={randomString()} progress={10} part={2} device={"mobile"}/>
	</Container>
);
