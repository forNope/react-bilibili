import * as React from "react";
import * as headerGround from "../assets/headerGround.png";
import * as styles from "./styles.scss";
import {Logo} from "./Logo";
import {Title} from "./Title";
import {SearchRank} from "./SearchRank";

export const Banner: React.SFC = () => (
	<div className={styles.container} style={{backgroundImage: `url(${headerGround})`}}>
		<div className="app-wrapper">
			<Logo/>
			<Title/>
			<SearchRank/>
		</div>
	</div>
);
