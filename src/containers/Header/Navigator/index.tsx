import * as React from "react";
import * as styles from "./styles.scss";
import * as headerGround from "../assets/headerGround.png";
import {Item} from "./components";
import {Nav} from "./Nav";
import {LoginMenu} from "./LoginMenu";

export function Navigator () {
	return (
		<div className={styles.container}>
			<div className={styles.mask}/>
			
			<div className={styles.blur} style={{backgroundImage: `url(${headerGround})`}}/>
			
			<div className="app-wrapper" style={{height: "42px"}}>
				<Nav/>
				<LoginMenu/>
			</div>
		</div>
	);
}
