import {data, off, on, removeData} from "@helps/DOM";
import * as React from "react";
import * as styles from "../commonStyles.scss";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {inject, observer} from "mobx-react";

@inject("player") @observer
export class PlayToggle extends React.Component<IControlBarProps> {
	@observable
	private isPlay = false;
	
	@action
	private setPlayState = (isPlay: boolean) => this.isPlay = isPlay
	
	private togglePlay = () => {
		const player = this.props.player;
		if (player.paused) {
			player.play();
		} else {
			player.pause();
		}
	}
	
	public render () {
		return (
			<div
				onClick={this.togglePlay}
				className={styles.container}
			>
				<i
					className={
						styles.icon
						+ " bilibili-player-iconfont"
						+ ` bilibili-player-iconfont-${this.isPlay ? "pause" : "start"}`
						+ ` icon-24${this.isPlay ? "pause" : "play"}`
					}
				/>
			</div>
		);
	}
	
	public componentDidMount () {
		const {player} = this.props;
		player
			.on("click", this.togglePlay)
			.on("playing", () => {
				player.focus();
				this.setPlayState(true);
			})
			.on("pause end", () => this.setPlayState(false))
			.on("keydown", (e: KeyboardEvent) => {
				if (e.keyCode === 32) {
					this.togglePlay();
				}
			});
	}
}
