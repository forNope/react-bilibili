import * as React from "react";
import * as styles from "../commonStyles.scss";
import * as theatreStyle from "./styles.scss";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";
import {IControlBarProps} from "../";
import {isFullScreen, fullScreenChange} from "@helps/DOM";

@inject("player", "playerWrapper") @observer
export class TheatreToggle extends React.Component<IControlBarProps> {
	@observable
	private isTheatre = false;
	
	@observable
	private isDisable = false;
	
	@action
	private toggleTheatreMode = () => {
		const {player, playerWrapper} = this.props;
		this.isTheatre = !this.isTheatre;
		playerWrapper.toggleClass(theatreStyle.theatre);
		if (this.isTheatre) {
			player.emit("entertheatre");
		} else {
			player.emit("exittheatre");
		}
	}
	
	public render () {
		return (
			<div
				className={`${styles.container} ${this.isDisable ? styles.disable : ""}`}
				onClick={this.isDisable ? null : this.toggleTheatreMode}
			>
				<i
					className={
						styles.icon
						+ " bilibili-player-iconfont"
						+ " bilibili-player-iconfont-widescreen"
						+ ` icon-24wide${this.isTheatre ? "on" : "off"}`
					}
				/>
				<div className={styles.text}>{this.isTheatre ? "退出" : "进入"}宽屏模式</div>
			</div>
		);
	}
	
	public componentDidMount () {
		const {player} = this.props;
		player.fullScreenChange(() => {
			this.isDisable = player.isFullScreen();
		});
	}
}
