import * as React from "react";
import * as styles from "./styles.scss";
import * as testVideo from "./assets/video.mp4";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {randomPic} from "@helps/random";
import {Notice} from "../Notice";
import {mockNotice} from "../Notice/__mocks__";
import {Auxiliary} from "../Auxiliary";
import {ControlBar} from "@videoComponents/Player/ControlBar";
import {isEmpty} from "@helps/string";

export interface IVideoProps {
	src?: string;
	poster?: string;
	controls?: boolean;
	muted?: boolean;
	width?: number;
	height?: number;
	preload?: "none" | "metadata" | "auto";
	loop?: boolean;
	autoPlay?: boolean;
}

const MediaEvents = ["abort", "canplay", "canplaythrough",
	"durationchange", "emptied", "encrypted",
	"ended", "error", "interruptbegin",
	"interruptend", "loadeddata", "loadedmetadata",
	"loadstart", "mozaudioavailable", "pause",
	"play", "playing", "progress",
	"ratechange", "seeked", "seeking",
	"stalled", "suspend", "timeupdate",
	"volumechange", "waiting"];

@observer
export class Video extends React.Component<IVideoProps> {
	public static defaultProps: IVideoProps = {
		src: "",
		poster: "",
		controls: false,
		muted: false,
		width: 600,
		height: 480,
		preload: "auto",
		loop: false,
		autoPlay: false,
	};
	
	private listeners: { [type: string]: Array<EventListener> } = {};
	
	private player: HTMLVideoElement;
	
	public on = (type: string, listener: EventListener) => {
		type.split(" ").forEach((_type) => {
			if (isEmpty(_type)) {
				return;
			}
			
			if (!this.listeners[_type]) {
				this.listeners[_type] = [];
			}
			
			this.listeners[_type].push(listener);
		});
	}
	
	public emit = (type: string, ...args: any[]) => {
		type.split(" ").forEach((_type) => {
			if (isEmpty(_type)) {
				return;
			}
			
			if (this.listeners[_type].length) {
				this.listeners[_type].forEach((fn) => fn.apply(this, args));
			}
		});
	}
	
	public migrationNativeEvent = () => {
		const keys = Object.keys(this.listeners);
		keys.forEach((key) => {
			if (MediaEvents.indexOf(key)) {
				this.listeners[key].forEach((listen) => {
					this.player.addEventListener(key, listen, false);
				});
				this.listeners[key] = [];
			}
		});
	}
	
	public volume = (volumeAsDecimal: number) => this.player.volume = volumeAsDecimal;
	
	public muted = (value: boolean) => this.player.muted = value;
	
	public play = () => this.player.play();
	
	public pause = () => this.player.pause();
	
	public src = (src: string) => this.player.src = src;
	
	public srcObject = (value: any) => this.player.srcObject = value;
	
	public loop = (value: boolean) => this.player.loop = value;
	
	public duration = () => this.player.duration;
	
	public currentTime = (time?: number) => {
		if (time) {
			this.player.currentTime = time;
		} else {
			return this.player.currentTime;
		}
	}
	
	public buffered = () => this.player.buffered;
	
	public canPlayType = (type: string) => this.player.canPlayType(type);
	
	public played = () => this.player.played;
	
	public paused = () => this.player.paused;
	
	public ended = () => this.player.ended;
	
	public seekable = () => this.player.seekable;
	
	public render () {
		return <video {...this.props} ref={(el) => this.player = el}/>;
	}
	
	public componentDidMount () {
		this.on("ready", this.migrationNativeEvent);
		window.setTimeout(() => this.emit("ready"));
	}
}
