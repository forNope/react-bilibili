import * as React from "react";
import * as styles from "./styles.scss";
import {IZoneRankMoreData} from "../interface";

export const PartRankMore: React.SFC<IZoneRankMoreData> = ({href = "javascript: void(0)"}) => (
	<a className={styles["zone-rank-more"]} href={href}>查看更多</a>
);
