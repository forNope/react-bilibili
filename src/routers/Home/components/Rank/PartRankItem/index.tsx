import * as React from "react";
import * as styles from "./styles.scss";
import {SerialNum} from "../";
import {formatNumber} from "@helps/format";

export interface IPartRankItemProps {
	num: number;
	src: string;
	title: string;
	href: string;
	score: number;
	origin: string;
	date: string;
	playAmount: number;
	danmuAmount: number;
	collectionAmount: number;
	coinAmount: number;
}

export const PartRankItem: React.SFC<IPartRankItemProps> = ({
	                                                            num,
	                                                            src,
	                                                            title,
	                                                            href = "javascript: void(0)",
	                                                            score,
	                                                            origin,
	                                                            date,
	                                                            playAmount,
	                                                            danmuAmount,
	                                                            collectionAmount,
	                                                            coinAmount,
                                                            }) => {
	const rightClass = `${styles.right} ${num === 1 ? styles.spec : styles.desc}`;
	
	return (
		<div className={styles["part-rank-item"]}>
			<div className={styles.left}>
				<SerialNum num={num}/>
			</div>
			
			<div className={styles.right}>
				<a className={styles.link} href={href} title={title}>
					{num === 1
						? (
							<div className={styles.left}>
								<img className={styles.pic} src={src} alt={title}/>
							</div>
						)
						: null}
					
					<div className={rightClass}>
						<p className={styles.title}>{title}</p>
						{num === 1 ? <p className={styles.score}>综合评分: {formatNumber(score)}</p> : null}
					</div>
				</a>
			</div>
		</div>
	);
};
