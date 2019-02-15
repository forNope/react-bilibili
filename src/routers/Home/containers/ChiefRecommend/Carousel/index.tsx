import {mockCarousel} from "@components/Carousel/__mocks__";
import * as React from "react";
import * as cssModules from "react-css-modules";
import * as styles from "./styles.scss";
import {PacManCarousel} from "@components/Carousel";

export const Carousel: React.SFC = () => (
	<div className={styles.container}>
		<PacManCarousel {...mockCarousel(5)}/>
	</div>
);
