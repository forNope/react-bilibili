import * as React from "react";
import * as styles from "./styles.scss";

export const SearchRank: React.SFC = () => (
	<div className={styles["search-bar"]}>
		<a className={styles.rank} href="#">
			<i className={styles.icon}/>
			<span className={styles.text}>排行榜</span>
		</a>
		
		<form className={styles.search} action="#" method="get">
			<input className={styles.input} type="text"/>
			<input className={styles.submit} type="submit" value=""/>
		</form>
	</div>
);
