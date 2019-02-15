import * as React from "react";
import * as styles from "./styles.scss";

export interface IBangumiCardProps {
	src: string;
	href: string;
	title: string;
	detailHref: string;
	updateTo?: string;
}

export const BangumiCard: React.SFC<IBangumiCardProps> = ({
	                                                          src,
	                                                          title,
	                                                          href,
	                                                          detailHref,
	                                                          updateTo,
                                                          }) => (
	<div className={styles.container}>
		<div className={styles.left}>
			<a className={styles.pic} href={href} title={title}>
				<img src={src} alt={title}/>
			</a>
		</div>
		
		<div className={styles.right}>
			<a className={styles.title} href={href} title={title}>{title}</a>
			
			<p className={styles.updateTo}>
				{updateTo
					? (
						<>
							更新至<a className={styles.episode + " " + styles.new} href={href}>{updateTo}</a>
						</>
					)
					: "暂无更新"}
			</p>
		</div>
	</div>
);
