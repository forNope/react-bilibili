import * as React from "react";
import * as styles from "./styles.scss";

interface IAvatarProps {
	src: string;
}

export const Avatar: React.SFC<IAvatarProps> = ({src}) => (
	<img src={src} className={styles.avatar}/>
);
