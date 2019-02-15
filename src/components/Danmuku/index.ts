import {CommentAnimation} from "@components/Danmuku/CommentAnimation";
import {CommentCreator} from "@components/Danmuku/CommentCreator";
import {IComment, ICommentData, IRoad} from "@components/Danmuku/interface";
import {forEach, remove} from "@helps/array/";
import {getDimension, on, one} from "@helps/DOM";
import {limitRange} from "@helps/number";
import {deepClone} from "@helps/object";
import {Timer} from "@helps/Timer";
import {isNumber} from "@helps/types";

interface IDanmukuProps {
	container: HTMLElement;
	dataList: Array<ICommentData>;
	density?: number;
	roadNum?: number;
	isPause?: boolean;
}

export class Danmuku {
	private animation: CommentAnimation;
	private density: number;
	private sortedDataList: Array<Array<ICommentData>>;
	private container: HTMLElement;
	private roads: Array<IRoad>;
	private time: number;
	private timer: Timer = new Timer();
	private hideMode: number[] = [];
	private isPause: boolean;
	private lockStates: Array<"start" | "stop"> = [];
	private _opacity = 1;
	
	public get opacity () {
		return this._opacity;
	}
	
	public set opacity (val) {
		this._opacity = limitRange(val, 1);
	}
	
	constructor ({
		             container,
		             dataList,
		             roadNum = 15,
		             density = 5,
		             isPause = true,
	             }: IDanmukuProps) {
		const splitHeight = getDimension(container).height / roadNum;
		this.sortedDataList = Danmuku.sort(dataList);
		this.container = container;
		this.isPause = isPause;
		
		this.roads = new Array(roadNum)
			.fill(null)
			.map((_, i) => {
				const result: IRoad = {
					children: [],
					placeHolder: (comment: IComment) => {
						const {el} = comment;
						el.style.top = i * splitHeight + "px";
						result.children.push(comment);
						comment.isUsing = true;
						return () => {
							this.container.appendChild(el);
						};
					},
					appendChild: (comment: IComment) => {
						const {el} = comment;
						el.style.top = i * splitHeight + "px";
						result.children.push(comment);
						comment.isUsing = true;
						this.container.appendChild(el);
					},
					removeChild: (comment: IComment) => {
						remove(result.children, comment);
						CommentCreator.recycling(comment);
						this.container.removeChild(comment.el);
					},
				};
				return result;
			});
		this.animation = new CommentAnimation({container});
		this.density = density;
		this.timer.register("timeupdate", this.update);
	}
	
	public update = () => {
		const dataList = this.sortedDataList[Math.round(this.time)];
		if (dataList) {
			dataList.forEach((data) => {
				this.send(data);
			});
		}
	}
	
	public insert = (data: ICommentData) => {
		const time     = data.time,
		      dataList = this.sortedDataList;
		if (!dataList[time]) {
			dataList[time] = [];
		}
		
		dataList[time].push(data);
	}
	
	public remove = (data: ICommentData) => {
		const time     = data.time,
		      dataList = this.sortedDataList;
		if (dataList[time]) {
			const index = dataList[time].indexOf(data);
			if (index !== -1) {
				dataList[time].splice(index, 1);
			}
		}
	}
	
	public setTime = (time: number) => {
		this.time = time;
	}
	
	public lockState = (state: "start" | "stop") => {
		if (!this.lockStates.includes(state)) {
			this.lockStates.push(state);
		}
	}
	
	public unlockState = (state: "start" | "stop") => {
		remove(this.lockStates, state);
	}
	
	public start = () => {
		if (!this.lockStates.includes("start")) {
			this.isPause = false;
			this.timer.setInterval("timeupdate", 1000);
			this.animation.start();
		}
	}
	
	public stop = () => {
		if (!this.lockStates.includes("stop")) {
			this.isPause = true;
			this.timer.stop("timeupdate");
			this.animation.stop();
		}
	}
	
	public show = (mode: number | IComment) => {
		if (!isNumber(mode)) {
			mode.el.style.visibility = "visible";
		} else {
			remove(this.hideMode, mode);
			for (const road of this.roads) {
				for (const comment of road.children) {
					if (comment.mode === mode) {
						this.show(comment);
					}
				}
			}
		}
	}
	
	public hide = (mode: number | IComment) => {
		if (!isNumber(mode)) {
			mode.el.style.visibility = "hidden";
		} else {
			this.hideMode.push(mode);
			for (const road of this.roads) {
				for (const comment of road.children) {
					if (comment.mode === mode) {
						this.hide(comment);
					}
				}
			}
		}
	}
	
	public clear = () => {
		this.animation.clear();
		CommentCreator.recycling();
		forEach(this.roads, (road) => {
			road.children = [];
		});
		this.container.innerHTML = "";
	}
	
	public send (data: ICommentData) {
		const comment     = CommentCreator.create(data),
		      animation   = this.animation,
		      road        = this.findIdleRoad(),
		      lastComment = road.children[road.children.length - 1],
		      append      = road.placeHolder(comment);
		
		if (this.hideMode.includes(comment.mode)) {
			this.hide(comment);
		}
		
		comment.el.style.opacity = "" + this.opacity;
		
		comment.animationEnd = () => road.removeChild(comment);
		if (lastComment) {
			lastComment.update = (x) => {
				if (Math.abs(x) >= lastComment.UI.width) {
					append();
					animation.init(comment);
					animation.insert(comment);
					if (!this.isPause) {
						animation.play(comment);
					}
					lastComment.update = null;
				}
			};
		} else {
			append();
			animation.init(comment);
			animation.insert(comment);
			if (!this.isPause) {
				animation.play(comment);
			}
		}
	}
	
	public resize = () => {
		setTimeout(() => {
			this.animation.resize();
		});
	}
	
	public setDensity = (density: number) => {
		this.density = density;
	}
	
	private static sort (dataList: Array<ICommentData>) {
		const result: Array<Array<ICommentData>> = [];
		dataList.forEach((data) => {
			const time = data.time;
			if (!result[time]) {
				result[time] = [];
			}
			result[time].push(data);
		});
		return result;
	}
	
	private findIdleRoad = () => {
		const roads = this.roads,
		      half  = Math.floor(roads.length / 2);
		return this.findMinChildrenRoad(roads.slice(0, half))
			|| this.findMinChildrenRoad(roads.slice(half))
			|| roads[0];
	}
	
	private findMinChildrenRoad = (roads: Array<IRoad> = this.roads) => {
		const childrenLen = roads.map((road) => road.children.length),
		      min         = Math.min.apply(null, childrenLen);
		if (min < this.density) {
			return roads[childrenLen.indexOf(min)];
		}
	}
}
