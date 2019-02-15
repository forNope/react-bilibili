import * as React from "react";
import * as styles from "./styles.scss";

export interface IActiveQuantityProps {
	num?: number;
	
	onClick? (): void;
	
	isUpdate?: boolean;
}

export const ActiveQuantity: React.SFC<IActiveQuantityProps> = ({num = 10, onClick, isUpdate}) => (
	<button
		className={`${styles.active} ${isUpdate ? styles.isUpdate : ""} ${num ? "" : styles.hidden}`}
		onClick={onClick}
	>
		<i className={styles.icon}/>
		{num}条新动态
	</button>
);
