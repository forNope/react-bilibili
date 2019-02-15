import * as React from "react";
import * as styles from "./styles.scss";
import * as iconImg from "@assets/icons.png";

interface IItemProps {
	text: string;
	href?: string;
	image?: string;
	position?: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            text,
	                                            href = "#",
	                                            image = iconImg,
	                                            position = "",
                                            }) => (
	<a className={styles.container} href={href}>
		<p className={styles.text}>{text}</p>
		<i
			className={styles.icon}
			style={{
				backgroundImage: `url(${image})`,
				backgroundPosition: position,
			}}
		/>
	</a>
);
