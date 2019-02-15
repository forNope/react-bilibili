import {forEach} from "@helps/array/forEach";
import {shallowEqual} from "@helps/object";
import {randomPic} from "@helps/random";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {limitRange} from "@helps/number";
import {addClass, data, getDimension, getMousePos, getProportion, off, on, removeClass, setStyle} from "@helps/DOM";
import {eventEmitter, IEventEmitter} from "@mixins/";

type cb = (percentAsDecimal: number) => void;

interface ISlideBarProps {
	disable?: boolean;
	orientation?: "vertical" | "horizontal";
	width?: string;
	height?: string;
	defaultLoadedPercentAsDecimal?: number;
	renderComponents?: Array<"loaded" | "point" | "buffered" | "scale">;
	// todo
	reverse?: boolean;
	// todo
	step?: number;
	
	onDragStart?: cb;
	onDrag?: cb;
	onDragEnd?: cb;
	onChange?: cb;
	onClick?: cb;
	
	onMouseEnter? (e: MouseEvent): void;
	
	onMouseMove? (mousePosPercent: number): void;
	
	onMouseLeave? (e: MouseEvent): void;
}

// todo: may be can use input
// <input type="range"/> and overwrite style
@eventEmitter(true)
export default class SlideBar extends React.Component<ISlideBarProps> implements IEventEmitter {
	public static displayName = "SlideBar";
	
	public static defaultProps = {
		orientation: "horizontal",
		renderComponents: ["loaded", "buffered", "scale", "point"],
		reverse: false,
		disable: false,
		step: 1,
		width: "100%",
		height: "100%",
		defaultLoadedPercentAsDecimal: 0,
	};
	
	private loadedPercentAsDecimal = 0;
	
	private bufferedPercentAsDecimal = 0;
	
	private isDrag = false;
	
	private container: HTMLElement;
	private navPoint: HTMLElement;
	private loadedBar: HTMLElement;
	private bufferedBar: HTMLElement;
	private scaleEl: HTMLElement;
	private scaleContentEl: HTMLElement;
	private previewEl: HTMLElement;
	
	public resize = () => {
		setTimeout(() => {
			this.setLoadedPercent(this.loadedPercentAsDecimal);
			this.setBufferedPercent(this.bufferedPercentAsDecimal);
		});
	}
	
	public setLoadedPercent = (percentAsDecimal: number) => {
		if (this.props.disable) {
			return;
		}
		
		const pointProportion = this.getPointProportion();
		this.loadedPercentAsDecimal = percentAsDecimal;
		
		if (this.loadedBar) {
			this.loadedBar.style[this.sizeKey] = limitRange(percentAsDecimal * 100, 100) + "%";
		}
		
		if (this.navPoint) {
			this.navPoint.style[this.offsetKey] = limitRange(
				(percentAsDecimal - pointProportion / 2) * 100,
				100 - pointProportion * 100,
			) + "%";
		}
	}
	
	public setBufferedPercent = (percentAsDecimal: number) => {
		if (this.props.disable) {
			return;
		}
		
		this.bufferedPercentAsDecimal = percentAsDecimal;
		this.bufferedBar.style[this.sizeKey] = limitRange(percentAsDecimal * 100, 100) + "%";
	}
	
	public setScaleContent = (content: string) => {
		this.scaleContentEl.textContent = content;
	}
	
	public setPreviewInfo = (info: {
		image: string;
		position: string;
	}) => {
		const {image, position} = info;
		setStyle(this.previewEl, {
			backgroundImage: `url(${image})`,
			backgroundPosition: position,
		});
	}
	
	public shouldComponentUpdate (nextProps: ISlideBarProps) {
		if (!shallowEqual(nextProps, this.props)) {
			this.detachEvent();
			this.attachEvent();
			return true;
		}
		
		return false;
	}
	
	public render () {
		const {
			      children,
			      disable,
			      orientation,
			      renderComponents,
			      width,
			      height,
		      }                                          = this.props,
		      components: Array<React.ReactElement<any>> = [];
		
		forEach(renderComponents, (name) => {
			switch (name) {
				case "point":
					components[0] = (
						<div
							className={styles["nav-point"]}
							key={name}
							ref={(el) => this.navPoint = el}
						/>
					);
					break;
				case "loaded":
					components[1] = (
						<div
							className={styles.loaded}
							key={name}
							ref={(el) => this.loadedBar = el}
						/>
					);
					break;
				case "buffered":
					components[2] = (
						<div
							className={styles.buffered}
							key={name}
							ref={(el) => this.bufferedBar = el}
						/>
					);
					break;
				case "scale":
					components[3] = (
						<div
							className={styles.scale}
							key={name}
							ref={(el) => this.scaleEl = el}
						>
							<div className={styles["bottom-arrow"]}/>
							<div className={styles["top-arrow"]}/>
							<div className={styles.content} ref={(el) => this.scaleContentEl = el}/>
							<i className={styles.preview} ref={(el) => this.previewEl = el}/>
						</div>
					);
					break;
			}
		});
		return (
			<div
				className={`${styles["slide-bar"]} ${disable ? styles.disable : ""}`}
				style={{width, height}}
				ref={(el) => this.container = el}
			>
				<div className={`${styles.inner} ${styles[orientation]}`}>
					{components}
				</div>
			</div>
		);
	}
	
	public componentDidMount () {
		if (!this.props.disable) {
			this.attachEvent();
		}
		this.setLoadedPercent(this.props.defaultLoadedPercentAsDecimal);
	}
	
	public componentWillUnmount () {
		this.detachEvent();
	}
	
	private handleClick = (e: MouseEvent) => {
		const percent = this.getPosPercentAsDecimal(e);
		this.setLoadedPercent(percent);
		this.emit("click", percent);
	}
	
	private pointDragStart = (e: MouseEvent) => {
		this.isDrag = true;
		addClass(this.container, styles["is-drag"]);
		this.emit("dragstart", this.loadedPercentAsDecimal);
	}
	
	private pointDragMove = (e: MouseEvent) => {
		if (this.isDrag) {
			const percent = this.getPosPercentAsDecimal(e);
			this.setLoadedPercent(percent);
			this.emit("drag", percent);
		}
	}
	
	private pointDragEnd = (e: MouseEvent) => {
		if (this.isDrag) {
			this.isDrag = false;
			removeClass(this.container, styles["is-drag"]);
			this.emit("dragend", this.getLoadedPercentAsDecimal());
		}
	}
	
	private handleMouseMove = (e: MouseEvent) => {
		if (this.props.disable) {
			return;
		}
		
		this.scaleEl.style[this.offsetKey] = this.getPosPercentAsDecimal(e) * 100 + "%";
		this.emit("mousemove", this.getPosPercentAsDecimal(e));
	}
	
	private attachEvent = () => {
		const {
			      onMouseEnter,
			      onMouseLeave,
			      renderComponents,
			      ...events,
		      }    = this.props,
		      body = document.body;
		if (renderComponents.includes("point")) {
			on(this.navPoint, "mousedown", this.pointDragStart);
			on(body, "mousemove", this.pointDragMove);
			on(body, "mouseup", this.pointDragEnd);
		}
		
		if (renderComponents.includes("scale")) {
			on(this.container, "mousemove", this.handleMouseMove);
		}
		
		on(this.container, "click", this.handleClick);
		on(this.container, "mouseenter", onMouseEnter);
		on(this.container, "mouseleave", onMouseLeave);
		
		Object
			.keys(events)
			.filter((key) => key.startsWith("on"))
			.forEach((key) => {
				this.on(key.slice(2).toLowerCase(), (events as any)[key]);
			});
	}
	
	private detachEvent = () => {
		const body = document.body;
		this.off();
		off(body, "mousemove", this.pointDragMove);
		off(body, "mouseup", this.pointDragEnd);
		off(this.container);
		off(this.navPoint);
	}
	
	public getLoadedPercentAsDecimal = () => this.loadedPercentAsDecimal;
	
	public getBufferedPercentAsDecimal = () => this.bufferedPercentAsDecimal;
	
	private getPointProportion = () => {
		if (this.navPoint && this.container) {
			return getDimension(this.navPoint)[this.sizeKey]
				/ getDimension(this.container)[this.sizeKey];
		} else {
			return 0;
		}
	}
	
	private getPosPercentAsDecimal = (e: MouseEvent | React.MouseEvent<HTMLElement>) => {
		const posPercent =
			      getMousePos(this.container, e)[this.axisKey]
			      / getDimension(this.container)[this.sizeKey];
		
		return limitRange(posPercent, 1);
	}
	
	private offsetKey: "left" | "bottom" = this.props.orientation === "horizontal"
		? "left"
		: "bottom";
	
	private sizeKey: "width" | "height" = this.props.orientation === "horizontal"
		? "width"
		: "height";
	
	private axisKey: "x" | "y" = this.props.orientation === "horizontal"
		? "x"
		: "y";
	
	on (types: string, listener: Function): this {
		return null;
	}
	
	off (types?: string, listener?: Function): this {
		return null;
	}
	
	one (types: string, listener: Function): this {
		return null;
	}
	
	emit (types: string, ...args: any[]): this {
		return null;
	}
}
