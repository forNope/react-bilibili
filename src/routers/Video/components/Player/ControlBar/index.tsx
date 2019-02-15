import * as React from "react";
import * as ReactDOM from "react-dom";
import * as styles from "./styles.scss";
import {Provider} from "mobx-react";
import {PlayToggle} from "./PlayToggle";
import {ProgressBar} from "./ProgressBar";
import {Volume} from "./Volume";
import {ResolutionToggle} from "./ResolutionToggle";
import {LoopToggle} from "./LoopToggle";
import {TheatreToggle} from "./TheatreToggle";
import {FullScreenToggle} from "./FullScreenToggle";
import {DanmukuController} from "./DanmukuController";
import {debounce} from "@helps/performance";
import {isFullScreen, on} from "@helps/DOM";
import {DOMHelps, IDOMHelps} from "@mixins/";

export interface IControlBarProps {
	playerWrapper?: HTMLDivElement & IDOMHelps;
	player?: HTMLVideoElement & IDOMHelps;
}

// video and player's difference
// the video mainly responsible control video element style
// the player mainly responsible

export class ControlBar extends React.Component<IControlBarProps> {
	@DOMHelps
	private controlBar: HTMLElement & IDOMHelps;
	
	// if cursor in area, it will show control bar, else hide it
	// area is a height from bottom to top
	private static showControlBarArea = window.screen.height / 2;
	// when stop move mouse will hide cursor and control bar after hideDelay ms
	private static hideDelay = 3000;
	
	private timer: number;
	
	public showControlBar = () => {
		this.controlBar.removeClass(styles["hide-control"]);
	}
	
	public hideControlBar = () => {
		this.controlBar.addClass(styles["hide-control"]);
	}
	
	public showCursor = () => {
		const {player} = this.props;
		player.removeClass(styles["hide-cursor"]);
		player.addClass(styles["show-cursor"]);
	}
	
	public hideCursor = () => {
		const {player} = this.props;
		player.removeClass(styles["show-cursor"]);
		player.addClass(styles["hide-cursor"]);
	}
	
	private handleMouseMove = (e: MouseEvent) => {
		const {player} = this.props;
		window.clearTimeout(this.timer);
		if (player.isFullScreen()) {
			if (e.clientY > ControlBar.showControlBarArea) {
				this.showControlBar();
			} else {
				this.timer = window.setTimeout(
					() => {
						if (player.isFullScreen()) {
							this.hideControlBar();
							this.hideCursor();
						}
					},
					ControlBar.hideDelay,
				);
				this.hideControlBar();
			}
			this.showCursor();
		}
	}
	
	public render () {
		return (
			<div className={styles["control-bar"]} data-role="controls">
				<Provider
					player={this.props.player}
					playerWrapper={this.props.playerWrapper}
				>
					<>
						<PlayToggle/>
						<ProgressBar/>
						<Volume/>
						<ResolutionToggle
							optionalResolutionArr={["自动", "流畅", "清晰", "高清"].reverse()}
							defaultResolution={"自动"}
						/>
						<DanmukuController/>
						<LoopToggle/>
						<TheatreToggle/>
						<FullScreenToggle/>
					</>
				</Provider>
			</div>
		);
	}
	
	public componentDidMount () {
		const {player, playerWrapper} = this.props;
		this.controlBar = ReactDOM.findDOMNode(this) as HTMLElement & IDOMHelps;
		player.fullScreenChange(() => {
			if (player.isFullScreen()) {
				this.controlBar.addClass(styles["full-screen"]);
			} else {
				window.clearTimeout(this.timer);
				this.showControlBar();
				this.showCursor();
				this.controlBar.removeClass(styles["full-screen"]);
			}
		});
		on(playerWrapper, "mousemove", this.handleMouseMove);
	}
}
