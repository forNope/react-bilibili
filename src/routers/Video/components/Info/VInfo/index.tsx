import * as React from "react";
import * as styles from "./styles.scss";

export interface IVInfoProps {
	title: string;
	// primary part
	priPart: string;
	// second part
	secPart: string;
	create: string;
	num: {
		play: string | number;
		danmu: string | number;
		coin: string | number;
		collection: string | number;
	};
}

export const VInfo: React.SFC<IVInfoProps> = ({
	title,
	priPart,
	secPart,
	create,
	num,
}) => {
	const { play, danmu, coin, collection } = num;
	return (
		<div className={styles.info}>
			<p className={styles.title}>{title}</p>

			<div className={styles["part-container"]}>
				<a href="#">主页</a>>
				<a href="#pripart">{priPart}</a>>
				<a href="#secPart">{secPart}</a>

				<span className={styles.create}>{create}</span>

				<a className={styles.complaints} href="#video_complaints">稿件投诉</a>
			</div>

			<div className={styles["num-container"]}>
				<span className={styles.play}>
					<i className={styles.icon} />
					<span className={styles.text}>{play}</span>
				</span>

				<span className={styles.danmu}>
					<i className={styles.icon} />
					<span className={styles.text}>{danmu}</span>
				</span>

				<span className={styles.split} />

				<span className={styles.coin}>
					<i className={styles.icon} />
					<span className={styles.text}>硬币</span>
					<span className={styles.text}>{coin}</span>
				</span>

				<span className={styles.collection}>
					<i className={styles.icon} />
					<span className={styles.text}>收藏</span>
					<span className={styles.text}>{collection}</span>
				</span>
			</div>
		</div>
	);
};
