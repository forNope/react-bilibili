import * as React from "react";
import * as cssModules from "react-css-modules";
import * as styles from "./styles.scss";
import { SerialNum } from "../";
import { ILiveRankProps } from "@homeComponents/Rank/interface";

export const LiveRankItem: React.SFC<ILiveRankProps> = ({
	                                                        num,
	src,
	href = "javascript: void(0)",
	name,
	signature,
	playVolume,
                                                        }) => (
		<div className={styles.rank}>
			{num
				? <SerialNum num={num} />
				: null}

			<a className={styles.link} href={href}>
				<div className={styles.left}>
					<div className={styles.pic}>
						<img src={src} alt={name} />
					</div>
				</div>

				<div className={styles.right}>

					<p className={styles.title}>
						<span className={styles.name}>{name}</span>

						<span className={styles["play-volume"]}>
							<i className={styles.icon} />
							<span className={styles.volume}>{playVolume}</span>
						</span>
					</p>

					<p className={styles.signature}>{signature}</p>
				</div>
			</a>
		</div>
	);
