import * as React from "react";
import * as styles from "./styles.scss";
import {Link} from "../../components/";

export interface IItemProps {
	text: string;
	href?: string;
	part?: number;
	progress: number;
	device: "pc" | "mobile";
}

export const Item: React.SFC<IItemProps> = ({
	                                            text,
	                                            href = "#",
	                                            part = 0,
	                                            progress,
	                                            device,
                                            }) =>
	(
		<Link text={text} href={href}>
			{part ? <span className={styles.part}>{"第" + part + "P | "}</span> : null}
			<span className={styles.progress}>{progress + "%"}</span>
			<i className={`${styles.device} ${styles[device]}`}/>
		</Link>
	);

// const copy = (
// 	<div className={styles.container}>
// 		<a href={href}>
// 			<span className={styles.text}>{text}</span>
//
// 			<div className={styles.right}>
// 				{part ? <span className={styles.part}>{"第" + part + "P | "}</span> : null}
// 				<span className={styles.progress}>{progress + "%"}</span>
// 				<i className={`${styles.device} ${styles[device]}`}/>
// 			</div>
// 		</a>
// 	</div>
// );
