import {limitRange} from "@helps/number";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as styles from "./styles.scss";
import {getOffset} from "@helps/DOM";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {debounce, throttle} from "@helps/performance";

export interface INavigatorProps {
	textArr: string[];
}

@observer
export default class Navigator extends React.Component {
	@observable
	private index: number;
	
	private els: Array<HTMLElement> = [];
	
	private elePosArr: Array<number> = [];
	
	private textArr = [
		"直播", "动画",
		"番剧", "国创",
		"音乐", "舞蹈",
		"游戏", "科技",
		"生活", "鬼畜",
		"时尚", "广告",
		"娱乐", "电影",
		"TV剧", "影视",
		"纪录片",
	];
	
	@action
	private scrollToIndex = (index: number) => {
		if (index >= 0) {
			window.scrollTo({
				behavior: "smooth",
				top: this.elePosArr[index],
			});
			this.index = index;
		} else {
			window.scrollTo({
				behavior: "smooth",
				top: 0,
			});
			this.container.style.top = "0";
			this.index = null;
		}
	}
	
	private handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		this.scrollToIndex(+target.dataset.index);
	}
	
	private handleScroll = throttle(
		() => {
			const y         = window.scrollY,
			      elePosArr = this.elePosArr;
			if (y < elePosArr[0] - 500) {
				this.index = null;
				return;
			}
			
			this.container.style.top = y > 600
				? limitRange(y - 253, 6640) + "px"
				: "0";
			
			this.index = this.elePosArr.findIndex((top) => y >= top - 250 && y <= top + 250);
		},
		16.67,
	);
	
	private container: HTMLElement;
	private containerRect: ClientRect;
	
	public render () {
		return (
			<div className={styles.container}>
				<ul className={styles.nav}>
					{this.textArr.map((text, i) => (
						<li
							className={`${styles.item} ${this.index === i ? styles.on : ""}`}
							onClick={this.handleClick}
							data-index={i}
							key={i}
						>
							{text}
						</li>
					))}
					<li className={styles.item + " " + styles.sort} key={"sort"}>
						<i className={styles.icon}/>
						排序
					</li>
				</ul>
				<div className={styles.base}/>
				<div
					className={`${styles["back-top"]} ${styles.item} ${styles.icon}`}
					onClick={this.handleClick}
				/>
			</div>
		);
	}
	
	public componentDidMount () {
		this.container = ReactDOM.findDOMNode(this) as HTMLElement;
		this.containerRect = this.container.getBoundingClientRect();
		const children = this.container.parentElement.children;
		Array
			.from(children)
			.slice(2, children.length - 1)
			.forEach((el: HTMLElement) => {
				this.els.push(el);
				this.elePosArr.push(getOffset(el).top);
			});
		
		window.addEventListener("scroll", this.handleScroll, false);
	}
	
	public componentWillUnmount () {
		window.removeEventListener("scroll", this.handleScroll, false);
	}
}
