import * as React from "react";
import * as styles from "./styles.scss";
import {link} from "@helps/string";

interface ITextProps {
	position: "topLeft" | "topRight"
		| "bottomLeft" | "bottomRight";
}

export const Text: React.SFC<ITextProps> = ({children, position}) => (
	<span
		className={`${styles.text} ${styles[link(position)]}`}
		data-role="text"
	>
		{children}
	</span>
);
