import * as React from "react";
import * as styles from "./styles.scss";

interface ICoverProps {
	src: string;
}

export const Cover: React.SFC<ICoverProps> = ({src}) => (
	<img src={src} alt="cover" className={styles.cover}/>
);
