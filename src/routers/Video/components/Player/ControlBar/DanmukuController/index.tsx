import {Danmuku} from "@components/Danmuku";
import SlideBar from "@components/SlideBar";
import {randomNumber, randomString} from "@helps/random";
import * as React from "react";
import * as styles from "./styles.scss";
import * as commonStyles from "../commonStyles.scss";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";
import {IControlBarProps} from "@videoComponents/Player/ControlBar";

function mockData (time: number, content: string) {
	return {
		time,
		content,
		mode: 0,
		color: "white",
	};
}

@inject("player", "playerWrapper") @observer
export class DanmukuController extends React.Component<IControlBarProps> {
	private danmuku: Danmuku;
	
	@observable
	private forbidMode = {
		all: false,
		scroll: false,
		top: false,
		bottom: false,
	};
	
	@observable
	private isAvoidBlocking = false;
	
	@action
	private toggleAvoidBlocking = () => {
		this.isAvoidBlocking = !this.isAvoidBlocking;
	}
	
	@action
	private toggleForbidMode = (mode?: number) => {
		const forbidMode = this.forbidMode as any,
		      danmuku    = this.danmuku;
		let mapMode: string;
		switch (mode) {
			case 0:
				mapMode = "scroll";
				break;
			case 1:
				mapMode = "top";
				break;
			case 2 :
				mapMode = "bottom";
				break;
			default:
				mapMode = "all";
				break;
		}
		forbidMode[mapMode] = !forbidMode[mapMode];
		
		if (forbidMode[mapMode]) {
			if (mapMode === "all") {
				danmuku.stop();
				danmuku.clear();
				danmuku.lockState("start");
				danmuku.lockState("stop");
			} else {
				danmuku.hide(mode);
			}
		} else {
			if (mapMode === "all") {
				danmuku.unlockState("start");
				danmuku.unlockState("stop");
				danmuku.start();
			} else {
				danmuku.show(mode);
			}
		}
	}
	
	@action
	private toggleForbidAll = () => {
		this.toggleForbidMode();
	}
	
	@action
	private toggleForbidTop = () => {
		this.toggleForbidMode(1);
	}
	
	@action
	private toggleForbidBottom = () => {
		this.toggleForbidMode(2);
	}
	
	@action
	private toggleForbidScroll = () => {
		this.toggleForbidMode(0);
	}
	
	private setOpacity = (opacityAsDecimal: number) => {
		this.danmuku.opacity = opacityAsDecimal;
	}
	
	public render () {
		return (
			<div
				className={commonStyles.container}
			>
				<i
					className={
						commonStyles.icon
						+ " bilibili-player-iconfont"
						+ " bilibili-player-iconfont-danmuku"
						+ ` icon-24danmu${this.forbidMode.all ? "off" : "on"}`
					}
					onClick={this.toggleForbidAll}
				/>
				<div
					className={
						styles["detail-controller"]
						+ ` ${commonStyles.detail}`
						+ ` ${commonStyles.append}`
					}
					style={this.forbidMode.all ? {visibility: "hidden"} : null}
				>
					<div className={styles["opacity-controller"]}>
						<span>不透明度</span>
						<SlideBar
							defaultLoadedPercentAsDecimal={1}
							renderComponents={["point", "loaded"]}
							onClick={this.setOpacity}
							onDrag={this.setOpacity}
						/>
					</div>
					
					<div
						className={styles["blocking-controller"]}
						onClick={this.toggleAvoidBlocking}
					>
						<span>防挡字幕</span>
						<i className={this.isAvoidBlocking ? "fa fa-check-square" : styles.uncheck}/>
					</div>
					
					<div className={styles["forbid-danmu-controller"]}>
						<div
							className={`${styles["forbid-item"]}  ${this.forbidMode.top ? styles.forbidden : ""}`}
							onClick={this.toggleForbidTop}
						>
							<i
								className={
									commonStyles.icon
									+ " bilibili-player-iconfont"
									+ " icon-48danmutop"
								}
							>
								<i
									className={
										styles["forbid-icon"]
										+ " bilibili-player-iconfont"
										+ " icon-24danmuforbid"
									}
								/>
							</i>
							<div className={styles["forbid-text"]}>顶端弹幕</div>
						</div>
						
						<div
							className={`${styles["forbid-item"]}  ${this.forbidMode.bottom ? styles.forbidden : ""}`}
							onClick={this.toggleForbidBottom}
						>
							<i
								className={
									commonStyles.icon
									+ " bilibili-player-iconfont"
									+ " icon-48danmubottom"
								}
							>
								<i
									className={
										styles["forbid-icon"]
										+ " bilibili-player-iconfont"
										+ " icon-24danmuforbid"
									}
								/>
							</i>
							<div className={styles["forbid-text"]}>底部弹幕</div>
						</div>
						<div
							className={`${styles["forbid-item"]}  ${this.forbidMode.scroll ? styles.forbidden : ""}`}
							onClick={this.toggleForbidScroll}
						>
							<i
								className={
									commonStyles.icon
									+ " bilibili-player-iconfont"
									+ " icon-48danmuscroll"
								}
							>
								<i
									className={
										styles["forbid-icon"]
										+ " bilibili-player-iconfont"
										+ " icon-24danmuforbid"
									}
								/>
							</i>
							<div className={styles["forbid-text"]}>滚动弹幕</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	public componentDidMount () {
		const {player, playerWrapper} = this.props,
		      danmukuContainer        = document.createElement("div"),
		      dataList                = new Array(200)
			      .fill(null)
			      .map(() => mockData(
				      randomNumber(60),
				      randomString("js是一个脚本语言|但是这又有什么关系呢|正在学习中|视频测试中|随机应变的高度|我一个要打十个"),
			      ));
		danmukuContainer.className = styles.danmuku;
		danmukuContainer.style.height = player.getDimension().height + "px";
		playerWrapper.appendChild(danmukuContainer);
		const danmuku = new Danmuku({
			container: danmukuContainer,
			dataList,
		});
		this.danmuku = danmuku;
		player.on("timeupdate", () => {
			if (!this.forbidMode.all) {
				danmuku.setTime(player.currentTime);
			}
		});
		player.on("playing", () => {
			danmuku.start();
		});
		player.on("pause", () => {
			danmuku.stop();
		});
		player.on("entertheatre exittheatre", () => {
			danmuku.resize();
		});
		player.fullScreenChange(() => {
			danmuku.resize();
		});
		player.on("seeked", () => {
			danmuku.clear();
		});
	}
}
