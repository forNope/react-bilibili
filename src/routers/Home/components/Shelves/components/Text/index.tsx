import * as React from "react";
import * as styles from "./styles.scss";

export interface ITextProps {
	text?: string;
	primary?: boolean;
}

export const Text: React.SFC<ITextProps> = ({
	                                            text,
	                                            primary,
                                            }) => (
	<p className={primary ? styles.primary : styles.default}>
		{text}
	</p>
);
