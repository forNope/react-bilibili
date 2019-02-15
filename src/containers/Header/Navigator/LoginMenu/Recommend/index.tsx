import * as React from "react";
import * as styles from "./styles.scss";
import {randomPic} from "@helps/random";
import {Item} from "./Item";

export const Recommend: React.SFC = () => (
	<div className={styles.recommend}>
		<div className={styles["title-box"]}>
			<h3>精彩推荐</h3>
			<a className={styles.more} href="#">
				更多
				<i className={styles.icon}/>
			</a>
		</div>
		
		<div className={styles.bangumi}>
			<Item imageSrc={randomPic()} title={"标题"}/>
			<Item imageSrc={randomPic()} title={"标题"}/>
			<Item imageSrc={randomPic()} title={"标题"}/>
		</div>
	</div>
);
