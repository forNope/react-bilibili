import * as React from "react";
import * as styles from "./styles.scss";
import { Info } from "./container/Info";
import { Player } from "./container/Player";

export const Video: React.SFC = () => (
	<div>
		<Info />
		<Player />
		<div style={{ height: "200px" }} />
	</div>
);
