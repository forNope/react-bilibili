import * as React from "react";
import * as styles from "./styles.scss";
import {Title, Link, Split} from "@homeComponents/Shelves/components";

export interface ISectionProps {
	onlineNum: number;
	latestUploadNum: number;
	pic: string;
	picHref: string;
}

export const Section: React.SFC<ISectionProps> = ({
	                                                  onlineNum,
	                                                  latestUploadNum,
	                                                  pic,
	                                                  picHref = "javascript: void(0)",
                                                  }) => (
	<div>
		<div className={styles.title}>
			<Link text={`在线人数: ${onlineNum}`}/>
			<Split/>
			<Link text={`最新投稿: ${latestUploadNum}`}/>
		</div>
		<div className={styles["pic-wrapper"]}>
			<a href={picHref}>
				<img className={styles.pic} src={pic}/>
			</a>
		</div>
	</div>
);
