import * as React from "react";
import * as styles from "./styles.scss";
import {eachPush} from "@helps/array";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {ICarouselProps, IOverwriteElementProperty} from "../interface";

@observer
export class CarouselBase extends React.Component<ICarouselProps> {
	public static defaultProps = {
		width: "440px",
		height: "220px",
		titleClassName: "",
		trigClassName: "",
		aniMode: "carousel",
		switchMode: "click",
		delayMs: 3000,
	};
	
	public static AniMode = {
		carousel: "carousel",
		fade: "fade",
	};
	
	public static SwitchMode = {
		click: "click",
		hover: "hover",
	};
	
	@observable private index: number = 0;
	private timerID: number;
	
	@action public switchImage = (index: number) => {
		this.index = index >= 0 ? index : this.index === this.resources.length - 1 ? 0 : ++this.index;
	}
	
	public play = () => {
		window.clearInterval(this.timerID);
		this.timerID = window.setInterval(this.switchImage, this.props.delayMs);
	}
	
	public pause = (): void => {
		window.clearInterval(this.timerID);
	}
	
	private handleTrigEvent = (e: React.MouseEvent<HTMLElement>): void => {
		const target = e.currentTarget as HTMLElement,
		      index  = +target.dataset.index;
		
		this.switchImage(index);
	}
	
	private resources: Array<IResource> = this.props.imgList.map((img: string, i: number) => ({
		src: img,
		title: this.props.titleList[i],
		href: this.props.hrefList[i],
	}));
	
	private trigMouseEvent = this.props.switchMode === "click"
		? {
			onClick: this.handleTrigEvent,
		}
		: {
			onMouseEnter: this.handleTrigEvent,
		};
	
	private containerStyle = {
		width: this.props.width,
		height: this.props.height,
	};
	
	private picWidth = this.props.aniMode === "carousel" ? this.resources.length * 100 + "%" : "100%";
	
	private picClass = `${styles.pic} ${this.props.aniMode === "carousel" ? styles["carousel-pic"] : styles["fade-pic"]}`;
	
	public render () {
		const {
			      aniMode,
			      switchMode,
			      width,
			      height,
			      onClassName,
			      titleClassName,
			      trigClassName,
		      } = this.props;
		
		const resources = this.resources,
		      length    = resources.length,
		      picStyle  = {
			      width: this.picWidth,
			      left: aniMode === "carousel"
				      ? -this.index * 100 + "%"
				      : 0,
		      };
		
		return (
			<div
				className={styles.container}
				onMouseEnter={this.pause}
				onMouseLeave={this.play}
				style={this.containerStyle}
			>
				<ul
					className={this.picClass}
					style={picStyle}
				>
					{eachPush(length, (i: number) => {
						const resource = resources[i];
						
						const {src, title, href} = resource;
						
						return (
							<li
								className={this.index !== i ? null : onClassName + " " + styles.on}
								key={i}
							>
								<a href={href} title={title}>
									<img src={src} alt={title}/>
								</a>
							</li>
						);
					})}
				</ul>
				
				<ul className={`${styles.title} ${titleClassName}`}>
					{eachPush(length, (i: number) => {
						const resource = resources[i];
						
						const {title, href} = resource;
						
						return (
							<li
								className={this.index !== i ? null : onClassName + " " + styles.on}
								key={i}
							>
								<a href={href}>{title}</a>
							</li>
						);
					})}
				</ul>
				
				<ul className={`${styles.trig} ${trigClassName}`}>
					{eachPush(length, (i: number) => (
						<li
							{...this.trigMouseEvent}
							className={this.index !== i ? null : onClassName}
							data-index={i}
							key={i}
						/>
					))}
				</ul>
			</div>
		);
	}
	
	public componentDidMount () {
		this.play();
	}
	
	public componentWillUnmount () {
		window.clearInterval(this.timerID);
	}
}
