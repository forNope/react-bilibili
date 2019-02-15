import * as React from "react";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

export interface IDanmuData {
	text: string;
	time: number;
	speed?: number;
	color?: string;
}

export interface IDanmuProps {
	dataArr?: Array<IDanmuData>;
}

@observer
export class Danmu extends React.Component<IDanmuProps> {
	private index = 0;
	private time = 0;
	
	@observable
	private danmuku: Array<ReactElement> = [];
	
	public setTime = (time: number) => {
		this.time = time;
		this.addDanmu();
	}
	
	public addDanmu = () => {
		const time    = this.time,
		      danmuku = this.danmuku;
		
		this.props.dataArr.forEach((data, i) => {
			if (data.time === time) {
				const index = danmuku.push(null);
				danmuku[index] = (
					<div
						className={styles.danmu}
						onAnimationEnd={this.removeDanmu}
						data-index={index}
					>
						<p key={i}>
							{data.text}
						</p>
					</div>
				);
			}
		});
	}
	
	public removeDanmu = (e: React.AnimationEvent<HTMLElement>) => {
		this.danmuku[+e.currentTarget.dataset.index] = null;
	}
	
	public render () {
		return (
			<>
				{this.danmuku}
			</>
		);
	}
}
