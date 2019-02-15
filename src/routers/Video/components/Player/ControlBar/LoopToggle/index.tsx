import * as React from "react";
import * as styles from "../commonStyles.scss";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";

@inject("player") @observer
export class LoopToggle extends React.Component<IControlBarProps> {
	@observable
	private isLoop = false;
	
	@action
	private setLoopState = (isLoop: boolean) => {
		this.isLoop = isLoop;
		this.props.player.loop = isLoop;
	}
	
	private toggleLoopState = () => {
		this.setLoopState(!this.props.player.loop);
	}
	
	public render () {
		return (
			<div className={styles.container} onClick={this.toggleLoopState}>
				<i
					className={
						styles.icon
						+ " bilibili-player-iconfont"
						+ " bilibili-player-iconfont-repeat"
						+ ` icon-24repeat${this.isLoop ? "on" : "off"}`
					}
				/>
				<div className={styles.text}>{this.isLoop ? "关闭" : "打开"}洗脑循环</div>
			</div>
		);
	}
}
