import {IPartRankDetailDesc, IPartRankDetailVolume, IShowPartDetailData} from "@homeComponents/Rank/interface";
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import * as styles from "./styles.scss";
import {randomNumber, randomPic, randomString} from "@helps/random";
import {Split} from "@homeComponents/Shelves/components";

export interface IPartRankStyle {
	top: string;
	left: string;
	opacity: number;
	visibility: string;
}

export interface IPartRankContent {
	title: string;
	origin: string;
	date: string;
	src: string;
	description: string;
	volume: {
		play: string | number;
		danmu: string | number;
		collection: string | number;
		coin: string | number;
	};
}

@observer
export class PartRankDetail extends React.Component {
	@observable private detailPos: IPartRankStyle = {
		top: "0",
		left: "0",
		opacity: 0,
		visibility: "hidden",
	};
	@observable private content: IPartRankContent = {
		title: "",
		origin: "",
		date: "",
		src: "",
		description: "",
		volume: {
			play: "",
			danmu: "",
			collection: "",
			coin: "",
		},
	};
	
	public setPosition = (top: string = "0", left: string = "0") => {
		this.detailPos = {
			top,
			left,
			opacity: 1,
			visibility: "visible",
		};
	}
	
	public setContent = (data: {
		title: string,
		origin: string,
		date: string,
		src: string,
		description: string,
		volume: {
			play: string | number,
			danmu: string | number,
			collection: string | number,
			coin: string | number,
		},
	}) => {
		this.content = data;
	}
	
	public hide () {
		this.detailPos = {
			top: "0",
			left: "0",
			opacity: 0,
			visibility: "hidden",
		};
	}
	
	public render () {
		const {title, origin, date, src, description, volume} = this.content,
		      {play, danmu, collection, coin}                 = volume;
		
		return (
			<div className={styles.detail} style={this.detailPos}>
				<div className={styles["title-wrapper"]}>
					<p className={styles.title}>{title}</p>
					
					<p>
						<span className={styles.origin}>{origin}</span>
						<Split/>
						<span className={styles.date}>{date}</span>
					</p>
				</div>
				
				<div className={styles["content-wrapper"]}>
					<img className={styles.pic} src={src}/>
					<p className={styles.desc}>{description}</p>
				</div>
				
				<div className={styles["volume-wrapper"]}>
					<div>
						<i className={styles.icon}/>
						<span>{play}</span>
					</div>
					
					<div>
						<i className={styles.icon}/>
						<span>{danmu}</span>
					</div>
					
					<div>
						<i className={styles.icon}/>
						<span>{collection}</span>
					</div>
					
					<div>
						<i className={styles.icon}/>
						<span>{coin}</span>
					</div>
				</div>
			</div>
		);
	}
}
