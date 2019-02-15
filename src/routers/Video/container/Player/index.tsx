import * as React from "react";
import * as styles from "./styles.scss";
import {Player as PlayerCom} from "@videoComponents/Player";
import {mockNotice} from "@videoComponents/Player/Notice/__mocks__";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

@observer
export class Player extends React.Component {
	public render () {
		return (
			<div className={styles.container}>
				<div className={"app-wrapper"}>
					<PlayerCom/>
				</div>
			</div>
		);
	}
}
