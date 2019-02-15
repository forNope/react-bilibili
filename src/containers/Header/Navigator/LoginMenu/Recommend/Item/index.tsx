import * as React from "react";
import * as styles from "./styles.scss"

interface IItemProps {
	title: string;
	href?: string;
	imageSrc: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            imageSrc,
	                                            title,
	                                            href = "#",
                                            }) => (
	<div className={styles.item}>
		<a href={href}>
			<img src={imageSrc} alt={title}/>
		</a>
		
		<a href={href} className={styles.link}>{title}</a>
	</div>
);
