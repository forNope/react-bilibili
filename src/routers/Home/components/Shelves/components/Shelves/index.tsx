import {DynamicLoad} from "@components/Lazyload";
import * as React from "react";
import * as styles from "./styles.scss";

interface IShelvesProps {
	height: string;
	autoLayout?: boolean;
}

export const Shelves: React.SFC<IShelvesProps> = ({
	                                                  height,
	                                                  children,
	                                                  autoLayout = true,
                                                  }) => (
	<div
		className={`${styles.shelves} ${autoLayout ? styles.auto : ""}`}
		style={{height}}
	>
		{children}
	</div>
);
