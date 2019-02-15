import * as React from "react";
import * as styles from "./styles.scss";
import * as previewImg from "./test.webp";
import {getProportion, on} from "@helps/DOM";
import {limitRange} from "@helps/number";
import {isNumber} from "@helps/types";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";
import {formatTime} from "@helps/format";
import {validateTime} from "@helps/validate";
import SlideBar from "@components/SlideBar";

@inject("player") @observer
export class ProgressBar extends React.Component<IControlBarProps> {
	private slideBar: SlideBar;
	
	private isDrag = false;
	private showScale = false;
	
	private scaleEl: HTMLElement;
	private scaleContentEl: HTMLElement;
	private seekTimeEl: HTMLInputElement;
	private timeProgressEl: HTMLElement;
	
	private timer: number;
	
	private previewSplit: number;
	
	private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 13) {
			e.currentTarget.blur();
		}
	}
	
	private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const val      = e.currentTarget.value,
		      {player} = this.props,
		      dur      = player.duration;
		
		if (isNumber(val)) {
			player.currentTime =
				val > dur
					? dur
					: val < 0
					? 0
					: val;
		} else if (validateTime(val)) {
			const time = formatTime(val);
			
			if (time > dur) {
				player.currentTime = dur;
			} else if (time <= 0) {
				player.currentTime = 0;
			} else {
				player.currentTime = time;
			}
		}
		
		this.toggleInputMode();
	}
	
	private toggleInputMode = () => {
		if (this.seekTimeEl.style.display === "none") {
			this.timeProgressEl.style.display = "none";
			this.seekTimeEl.style.display = "block";
			this.seekTimeEl.value = formatTime(this.props.player.currentTime);
			this.seekTimeEl.focus();
		} else {
			this.timeProgressEl.style.display = "block";
			this.seekTimeEl.style.display = "none";
		}
	}
	
	private handleDragStart = () => this.isDrag = true;
	private handleDrag = (percentAsDecimal: number) => {
		this.setTimeProgress(percentAsDecimal);
	}
	private handleDragEnd = (percent: number) => {
		this.isDrag = false;
		this.props.player.currentTime = this.getTime(percent);
	}
	
	private handleClick = (percent: number) => {
		const {player} = this.props;
		player.currentTime = this.getTime(percent);
		player.play();
	}
	
	private handleMouseMove = (percent: number) => {
		const slideBar = this.slideBar,
		      time     = this.getTime(percent),
		      num      = Math.floor(time / this.previewSplit),
		      x        = -(num * 160 - (Math.floor((num) / 10) * 1600)),
		      y        = -(Math.floor((num) / 10) * 92);
		
		slideBar.setScaleContent(formatTime(time));
		slideBar.setPreviewInfo({
			image: previewImg,
			position: `${x}px ${y}px`,
		});
	}
	
	public render () {
		return (
			<div className={styles.progress}>
				<SlideBar
					ref={(com) => this.slideBar = com}
					onDragStart={this.handleDragStart}
					onDrag={this.handleDrag}
					onDragEnd={this.handleDragEnd}
					onClick={this.handleClick}
					onMouseMove={this.handleMouseMove}
				/>
				<input
					className={styles.seek}
					style={{display: "none"}}
					type="text"
					onKeyDown={this.handleKeyDown}
					onBlur={this.handleBlur}
					ref={(el) => this.seekTimeEl = el}
				/>
				<div
					className={styles["time-progress"]}
					style={{display: "block"}}
					onClick={this.toggleInputMode}
					ref={(el) => this.timeProgressEl = el}
				/>
			</div>
		);
	}
	
	public componentDidMount () {
		const {player} = this.props,
		      slideBar = this.slideBar;
		
		let dur: number;
		
		player.on("loadedmetadata", () => {
			dur = player.duration;
			this.previewSplit = dur / 15;
			this.setTimeProgress(0);
			
			// progress event sometimes not work
			this.timer = window.setInterval(
				() => {
					const buffered = player.buffered,
					      start    = buffered.start(0),
					      end      = buffered.end(0);
					this.slideBar.setBufferedPercent((end - start) / dur);
				},
				1000,
			);
		});
		
		player.on("timeupdate", () => {
			if (!this.isDrag) {
				const time    = player.currentTime,
				      percent = time / dur;
				this.setTimeProgress(percent);
				slideBar.setLoadedPercent(percent);
			}
		});
		
		player.on("keydown", (e: KeyboardEvent) => {
			const keyCode = e.keyCode;
			if (keyCode === 37) {
				player.currentTime -= 5;
			} else if (keyCode === 39) {
				player.currentTime += 5;
			}
		});
		
		player.on("entertheatre exittheatre", () => {
			this.slideBar.resize();
		});
		
		player.fullScreenChange(() => {
			this.slideBar.resize();
		});
	}
	
	public componentWillUnmount () {
		window.clearInterval(this.timer);
	}
	
	public setTimeProgress = (() => {
		let cacheFormatDur: string;
		return (percentAsDecimal: number) => {
			const {player} = this.props;
			
			if (!cacheFormatDur) {
				cacheFormatDur = formatTime(player.duration);
			}
			
			this.timeProgressEl.textContent =
				formatTime(player.duration * percentAsDecimal) + "/" + cacheFormatDur;
		};
	})();
	
	private getTime = (percentAsDecimal: number) => {
		return this.props.player.duration * percentAsDecimal;
	}
}
