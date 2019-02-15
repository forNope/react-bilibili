import * as React from "react";
import * as styles from "./styles.scss";
import ListView from "@components/ListView";
import {randomString, randomTime, randomDate} from "@helps/random";
import {eachPush} from "@helps/array";

export class List extends React.Component {
	private lastSelectItem: HTMLElement;
	
	private handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.currentTarget;
		if (this.lastSelectItem) {
			this.lastSelectItem.className = styles.item;
		}
		
		target.className = `${styles.item} ${styles.select}`;
		this.lastSelectItem = target;
	}
	
	public render () {
		return (
			<div className={styles.container}>
				<div className={styles.sort}>
					<span className={styles.time}>时间</span>
					<span className={styles.text}>弹幕内容</span>
					<span className={styles.date}>发送时间</span>
				</div>
				<ListView
					onePageItems={30}
					offset={24}
				>
					{eachPush(100, (i) => {
						const text = randomString("测试弹幕|魔域");
						return (
							<div
								key={i}
								className={styles.item}
								onClick={this.handleClick}
							>
								<span className={styles.time}>{randomTime()}</span>
								<span className={styles.text} title={text}>{text}</span>
								<span className={styles.date}>{randomDate(2018, "mm-dd")}</span>
								<div className={styles.shield}>
									<div className={styles.popup}>屏蔽该弹幕的发送者</div>
									屏蔽用户
								</div>
							</div>
						);
					})}
				</ListView>
			</div>
		);
	}
}
