import * as React from "react";
import * as styles from "./styles.scss";
import {ICarouselProps} from "../interface";
import {CarouselBase} from "../Base";

export const PacManCarousel: React.SFC<ICarouselProps> = (props) => (
	<CarouselBase
		{...props}
		titleClassName={styles.title}
		trigClassName={styles.trig}
		onClassName={styles.on}
	/>
);
