import * as React from "react";
import * as styles from "./styles.scss";
import {ActiveQuantity, IActiveQuantityProps} from "./ActiveQuantity";
import {More, IMoreProps} from "./More";

export interface IUpdateBtnProps extends IActiveQuantityProps, IMoreProps {}

export const UpdateBtns: React.SFC<IUpdateBtnProps> = ({onClick, href, isUpdate}) => (
	<>
		<div className={styles.full}/>
		<ActiveQuantity onClick={onClick}/>
		<More href={href}/>
	</>
);

export {ActiveQuantity, More};
