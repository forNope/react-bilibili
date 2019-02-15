import * as React from "react";
import * as styles from "../commonStyles.scss";
import * as screenStyles from "./styles.scss";
import {
	fullScreenChange,
	isFullScreen,
	enterFullScreen,
	exitFullScreen, addStyle, data, removeStyle, off, on, one,
} from "@helps/DOM";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";

@inject("player", "playerWrapper") @observer
export class FullScreenToggle extends React.Component<IControlBarProps> {
	@observable
	private isFullPage = false;
	
	@observable
	private isFullWindow = false;
	
	@action
	private setScreenMode = (type: "page" | "window", isFull: boolean) => {
		const {player, playerWrapper} = this.props,
		      root                    = document.documentElement;
		if (isFull) {
			if (type === "page") {
				addStyle(root, "overflow: hidden");
				const listener = (e: KeyboardEvent) => {
					if (e.keyCode === 27) {
						this.setScreenMode("page", false);
						off(root, "keydown", listener);
					}
				};
				on(root, "keydown", listener);
				playerWrapper.addClass(screenStyles["full-page"]);
				this.isFullPage = true;
			} else {
				playerWrapper.addClass(screenStyles["full-window"]);
				if (!player.isFullScreen()) {
					playerWrapper.enterFullScreen();
				}
				this.isFullWindow = true;
			}
			player.focus();
		} else {
			if (type === "page") {
				playerWrapper.removeClass(screenStyles["full-page"]);
				removeStyle(root, "overflow");
				this.isFullPage = false;
			} else {
				playerWrapper.removeClass(screenStyles["full-window"]);
				if (player.isFullScreen()) {
					playerWrapper.exitFullScreen();
				}
				this.isFullWindow = false;
			}
			player.scrollIntoView();
		}
	}
	
	private enterFullWindow = () => {
		this.setScreenMode("window", true);
	}
	
	private exitFullWindow = () => {
		this.setScreenMode("window", false);
	}
	
	private enterFullPage = () => {
		this.setScreenMode("page", true);
	}
	
	private exitFullPage = () => {
		this.setScreenMode("page", false);
	}
	
	public render () {
		return (
			<div className={styles.container}>
				<i
					className={
						styles.icon
						+ " bilibili-player-iconfont"
						+ " bilibili-player-iconfont-fullscreen"
						+ " icon-24fullscreen"
					}
					onClick={this.isFullWindow ? this.exitFullWindow : this.enterFullWindow}
				/>
				{this.isFullWindow
					? null
					: (
						<>
							<p className={styles.text}>{this.isFullWindow ? "退出" : "进入"}全屏模式</p>
							<div className={`${styles.container} ${styles.second}`}>
								<i
									className={
										styles.icon
										+ " bilibili-player-iconfont"
										+ " bilibili-player-iconfont-web-fullscreen"
										+ " icon-24webfull"
									}
									onClick={this.isFullPage ? this.exitFullPage : this.enterFullPage}
								/>
								<p className={styles.text}>{this.isFullPage ? "退出" : ""}网页全屏</p>
							</div>
						</>
					)}
			</div>
		);
	}
	
	public componentDidMount () {
		const {player} = this.props;
		player.fullScreenChange(() => {
			this.setScreenMode("window", player.isFullScreen());
		});
	}
}
