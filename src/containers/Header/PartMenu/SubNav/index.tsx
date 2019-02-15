import * as React from "react";
import * as styles from "./styles.scss";

export interface ISubNavProps {
	names: string[];
	hrefList: string[];
}

export function SubNav (props: ISubNavProps) {
	const names: string[]    = props.names,
	      hrefList: string[] = props.hrefList;
	
	return (
		<ul className={styles.nav} data-role="sub-nav">
			{names.map((name: string, i: number) => {
				return (
					<li className={styles.item} key={i}>
						<a className={styles.link} href={hrefList[i]}>
							<i className={styles["right-arrow"]}/>
							{name}
							<i className={styles["left-arrow"]}/>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
