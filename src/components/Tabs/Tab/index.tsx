import * as React from "react";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

interface ITabProps {
	className?: string;
	isSelect?: boolean;
	isDisable?: boolean;
}

export const Tab: React.SFC<ITabProps> = ({
	                                          children,
	                                          className = "",
	                                          isSelect,
                                          }) => {
	return (
		<span
			className={`${styles.container} ${className} ${isSelect ? styles.on : ""}`}
		>
			{children}
		</span>
	);
};

(Tab as any).role = "tab";
