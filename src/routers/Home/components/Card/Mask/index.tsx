import * as React from "react";
import * as styles from "./styles.scss";
import {formatNumber} from "@helps/format";

export interface IMaskCardProps {
	src: string;
	href: string;
	title: string;
	author: string;
	playAmount: number;
}

export const MaskCard: React.StatelessComponent<IMaskCardProps> = ({
	                                                                   src,
	                                                                   title,
	                                                                   href = "javascript: void(0)",
	                                                                   author,
	                                                                   playAmount,
                                                                   }) => {
	return (
		<div className={styles.container}>
			<a href={href}>
				<img className={styles.pic} src={src} alt={title}/>
				
				<div className={styles.mask}>
					<p className={styles.title} title={title}>{title}</p>
					<p className={styles.author} title={author}>up主: {author}</p>
					<p className={styles["play-amount"]} title={String(playAmount)}>播放量: {formatNumber(playAmount)}</p>
				</div>
			</a>
		</div>
	);
};
