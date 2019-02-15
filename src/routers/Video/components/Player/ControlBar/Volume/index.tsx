import * as React from "react";
import * as styles from "./styles.scss";
import * as commonStyles from "../commonStyles.scss";
import SlideBar from "@components/SlideBar";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";
import {limitRange} from "@helps/number";
import {isFullScreen, on} from "@helps/DOM";

export type volumeIconType = "small" | "large" | "off";

@inject("player") @observer
export class Volume extends React.Component<IControlBarProps> {
	private slideBar: SlideBar;
	
	private lastVolumeAsDecimal = 0;
	
	@observable
	private volumeAsDecimal = 0;
	
	@observable
	private iconType: volumeIconType = "off";
	
	@action
	private setIconClass = (volume: number) => {
		if (volume > 0.5) {
			this.iconType = "large";
		} else if (volume > 0) {
			this.iconType = "small";
		} else {
			this.iconType = "off";
		}
	}
	
	private setVolume = (size: number) => {
		size = limitRange(size, 1);
		this.lastVolumeAsDecimal = this.volumeAsDecimal;
		this.props.player.volume = size;
		this.slideBar.setLoadedPercent(size);
	}
	
	private toggleVolumeState = () => {
		let volume: number;
		if (this.volumeAsDecimal) {
			volume = 0;
		} else if (!this.volumeAsDecimal && !this.lastVolumeAsDecimal) {
			volume = 0.02;
		} else {
			volume = this.lastVolumeAsDecimal;
		}
		
		this.props.player.volume = volume;
	}
	
	private handleMouseWheel = (e: WheelEvent) => {
		const {player} = this.props;
		if (isFullScreen()) {
			player.volume = e.wheelDelta < 0
				? limitRange(player.volume + 0.1, 1)
				: limitRange(player.volume - 0.1, 1);
		}
	}
	
	public render () {
		return (
			<div className={commonStyles.container}>
				<i
					className={
						commonStyles.icon
						+ " bilibili-player-iconfont"
						+ ` bilibili-player-iconfont-volume${
							this.iconType === "large"
								? "-max"
								: this.iconType === "off"
								? ""
								: "-small"}`
						+ ` icon-24sound${this.iconType}`
					}
					onClick={this.toggleVolumeState}
				/>
				<div className={`${styles["volume-bar-box"]} ${commonStyles.append} ${commonStyles.detail}`}>
					<span className={styles.text}>{Math.round(this.volumeAsDecimal * 100)}</span>
					<SlideBar
						ref={(com) => this.slideBar = com}
						height={"70px"}
						orientation={"vertical"}
						onClick={this.setVolume}
						onDrag={this.setVolume}
						renderComponents={["point", "loaded"]}
					/>
				</div>
			</div>
		);
	}
	
	@action
	private update = () => {
		const volumeAsDecimal = this.props.player.volume;
		this.setIconClass(volumeAsDecimal);
		this.lastVolumeAsDecimal = this.volumeAsDecimal;
		this.volumeAsDecimal = volumeAsDecimal;
	}
	
	public componentDidMount () {
		const {player} = this.props;
		player.on("mousewheel", this.handleMouseWheel);
		player.on("canplay volumechange", this.update);
		player.on("keydown", (e: KeyboardEvent) => {
			const keyCode = e.keyCode,
			      volume  = player.volume;
			if (keyCode === 38) {
				this.setVolume(volume + 0.1);
			} else if (keyCode === 40) {
				this.setVolume(volume - 0.1);
			}
		});
		player.one("canplay", () => {
			this.setVolume(+localStorage.getItem("volume"));
		});
		window.addEventListener("beforeunload", () => {
			localStorage.setItem("volume", "" + player.volume);
		});
	}
}
