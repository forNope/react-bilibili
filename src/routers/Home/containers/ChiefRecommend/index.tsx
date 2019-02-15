import * as React from "react";
import * as styles from "./styles.scss";
import { Carousel } from "./Carousel";
import { Recommend } from "./Recommend";

export const ChiefRecommend: React.SFC = () => (
	<div className={styles.container}>
		<Carousel />
		<Recommend />
	</div>
);
