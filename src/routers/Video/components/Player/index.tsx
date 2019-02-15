import * as React from "react";
import * as styles from "./styles.scss";
import * as testVideo from "./backup/assets/video.mp4";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {ControlBar} from "./ControlBar";
import {DOMHelps, IDOMHelps} from "@mixins/";

export class Player extends React.Component {
	@DOMHelps
	private player: HTMLVideoElement & IDOMHelps;
	
	@DOMHelps
	private playerWrapper: HTMLDivElement & IDOMHelps;
	
	public render () {
		return (
			<div
				className={styles.player}
			>
				<div
					className={styles["video-panel"]}
					ref={(el) => this.playerWrapper = el as HTMLDivElement & IDOMHelps}
				>
					<video
						src={testVideo}
						preload={"auto"}
						tabIndex={1}
						ref={(el) => this.player = el as HTMLVideoElement & IDOMHelps}
					/>
					{this.player
						? (
							<ControlBar
								player={this.player}
								playerWrapper={this.playerWrapper}
							/>
						)
						: null}
				</div>
			</div>
		);
	}
	
	public componentDidMount () {
		this.player.on("keydown", (e: KeyboardEvent) => {
			e.preventDefault();
		});
		this.forceUpdate();
	}
	
	public componentWillUnmount () {
		// clear all events
		this.player.off();
		this.playerWrapper.off();
	}
}
