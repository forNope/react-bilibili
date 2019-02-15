import * as React from "react";
import * as styles from "./styles.scss";
import { VInfo, UploaderInfo } from "@videoComponents/Info";
import { mockVInfo } from "@videoComponents/Info/Vinfo/__mocks__";
import { mockUploaderInfo } from "@videoComponents/Info/UploaderInfo/__mocks__";

export const Info: React.SFC = () => (
	<div className={styles.container}>
		<div className="app-wrapper">
			<VInfo {...mockVInfo()} />
			<UploaderInfo {...mockUploaderInfo()} />
		</div>
	</div>
);
