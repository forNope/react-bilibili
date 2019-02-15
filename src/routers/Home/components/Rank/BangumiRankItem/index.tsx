import { IBangumiRankItemProps } from "@homeComponents/Rank/interface";
import * as React from "react";
import * as styles from "./styles.scss";
import { SerialNum } from "@homeComponents/Rank";

export const BangumiRankItem: React.SFC<IBangumiRankItemProps> = ({
	num,
	title,
	href = "javascript: void(0)",
	updateTo,
                                                                  }) => (
		<div className={styles.container}>
			<div className={styles.left}>
				<SerialNum num={num} />
			</div>

			<a className={styles.right + " " + styles.link} href={href} title={title}>
				<span className={styles.title}>{title}</span>
				<span className={styles.update}>
					{updateTo ? "更新至" + updateTo : "尚无更新"}
				</span>
			</a>
		</div>
	);
