import {eachPush} from "@helps/array";
import {MaskCard} from "@homeComponents/Card";
import {mockMaskCard} from "@homeComponents/Card/Mask/__mocks__";
import * as React from "react";
import * as styles from "./styles.scss";

export const Recommend: React.SFC = () => (
	<div className={styles.container}>
		<div className={styles["rec-btn"] + " " + styles.pre}>昨日</div>
		<div className={styles["rec-btn"] + " " + styles.next}>一周</div>
		
		<div className={styles["card-content"]}>
			{new Array(10)
				.fill(null)
				.map((i) => <MaskCard {...mockMaskCard()} key={i}/>)
			}
		</div>
	</div>
);
