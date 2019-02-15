import * as React from "react";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

interface IPushProps {
	timeSec?: number;
	// unit: px
	// animation start offset
	initialOffset: number;
	// animation end offset
	applyOffset: number;
	// left to right, top to bottom's abbreviations
	direction: "ltr" | "rtl" | "ttb" | "btt";
}

type IAniState = "playing" | "paused" | "end";

@observer
export class Push extends React.Component<IPushProps> {
	public static defaultProps = {
		timeSec: 0.3,
	};
	
	private playState: IAniState = "paused";
	
	private setPlayState = (type: IAniState) => {
		this.playState = type;
	}
	
	public getPlayState = () => this.playState;
	
	@observable
	private offset = this.props.initialOffset;
	
	public getDirection = () => {
		let direction;
		switch (this.props.direction) {
			case "ltr":
				direction = "left";
				break;
			case "rtl":
				direction = "right";
				break;
			case "ttb":
				direction = "top";
				break;
			case "btt":
				direction = "bottom";
				break;
		}
		return direction;
	}
	
	@action
	public play = () => {
		this.setPlayState("playing");
		this.offset = this.props.applyOffset;
	}
	
	public pause = () => {
		this.setPlayState("paused");
		this.offset = this.props.initialOffset;
	}
	
	public isPaused = () => this.playState === "paused";
	
	public render () {
		const {timeSec} = this.props;
		
		return (
			<div
				onMouseEnter={this.play}
				onMouseLeave={this.pause}
				style={{
					position: "absolute",
					transition: `all ${timeSec}s`,
					[this.getDirection()]: this.offset,
				}}
			>
				{this.props.children}
			</div>
		);
	}
	
	public componentDidMount () {
		setTimeout(this.play, 0);
	}
}
