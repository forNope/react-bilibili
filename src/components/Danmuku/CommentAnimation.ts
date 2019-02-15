import {IComment, IRoad} from "@components/Danmuku/interface";
import {remove} from "@helps/array";
import {forEach} from "@helps/array/forEach";
import {from} from "@helps/array/from";
import {addStyle, getDimension, off, on, one} from "@helps/DOM";
import {getTranslate} from "@helps/DOM/style/getTranslate";
import {toNum} from "@helps/number/toNum";
import {Timer} from "@helps/Timer";
import * as styles from "./styles.scss";

interface ICommentAnimationProps {
	container: HTMLElement;
}

export class CommentAnimation {
	private containerWidth: number;
	private container: HTMLElement;
	private runningComments: Array<IComment> = [];
	private queueComments: Array<IComment> = [];
	private roads: Array<IRoad>;
	private timer = new Timer();
	private isPause = true;
	public static UPDATE_TIME = 200;
	
	constructor ({
		             container,
	             }: ICommentAnimationProps) {
		this.container = container;
		this.containerWidth = getDimension(container).width;
		this.timer.register("updateUI", this.updateUI);
		this.timer.setInterval("updateUI", CommentAnimation.UPDATE_TIME);
	}
	
	private updateUI = (comment?: IComment) => {
		if (comment) {
			const {el, UI} = comment;
			UI.x = getTranslate(el).x;
			if (comment.update) {
				comment.update(UI.x);
			}
		} else {
			this.runningComments.forEach((comment) => {
				this.updateUI(comment);
			});
		}
	}
	
	public init = (comment: IComment) => {
		const {el, liveTime, speed, animationEnd} = comment;
		comment.UI = {
			width: getDimension(comment.el).width,
			x: 0,
		};
		el.style.transform = "translate3d(0,0,0)";
		el.style.transition = `transform ${liveTime / speed}s linear`;
		const end = () => {
			this.updateUI(comment);
			if (-comment.UI.x >= (comment.UI.width + this.containerWidth)) {
				if (animationEnd) {
					animationEnd();
				}
				this.remove(comment);
				off(el, "transitionend", end);
			}
		};
		on(el, "transitionend", end);
	}
	
	public start = () => {
		this.isPause = false;
		this.timer.setInterval("updateUI", CommentAnimation.UPDATE_TIME);
		this.updateUI();
		this.play();
	}
	
	public stop = () => {
		this.isPause = true;
		this.timer.stop("updateUI");
		this.updateUI();
		this.pause();
	}
	
	public play = (comment?: IComment) => {
		if (comment) {
			const {el, speed, liveTime, UI} = comment,
			      needMove                  = this.containerWidth + UI.width - Math.abs(UI.x);
			el.style.transitionDuration = needMove / this.getAFrameMoveDistance(comment) / 60 + "s";
			el.style.transform = `translate3d(-${this.containerWidth + UI.width}px,0,0)`;
		} else {
			this.runningComments.forEach((comment) => this.play(comment));
		}
	}
	
	public pause = (comment?: IComment) => {
		if (comment) {
			const {el, UI} = comment;
			el.style.transform = `translate3d(${UI.x}px, 0, 0)`;
			el.style.transitionDuration = "0s";
		} else {
			this.runningComments.forEach((comment) => this.pause(comment));
		}
	}
	
	public insert = (comment: IComment) => {
		this.runningComments.push(comment);
	}
	
	public remove = (comment: IComment) => {
		remove(this.runningComments, comment);
	}
	
	public resize = () => {
		if (!this.isPause) {
			this.pause();
		}
		const newWidth = getDimension(this.container).width;
		this.runningComments.forEach((comment) => {
			const {
				      el,
				      UI,
			      } = comment;
			UI.x = -this.getMoveTime(comment) * this.getAFrameMoveDistance(comment, newWidth) * 60
			el.style.transform = `translate3d(${UI.x}px,0,0)`;
		});
		this.containerWidth = getDimension(this.container).width;
		if (!this.isPause) {
			this.play();
		}
	}
	
	public clear = () => {
		this.pause();
		this.runningComments = [];
	}
	
	private getAFrameMoveDistance = (comment: IComment,
	                                 width: number = this.containerWidth) => {
		const {
			      speed    = 1,
			      liveTime = 5,
		      } = comment;
		return width / (liveTime / speed) / 60;
	}
	
	private getMoveTime = (comment: IComment) => {
		const {UI} = comment;
		return Math.abs(UI.x) / this.getAFrameMoveDistance(comment) / 60;
	}
}
