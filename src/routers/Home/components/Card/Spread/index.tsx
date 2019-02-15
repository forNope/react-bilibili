import {getMousePos} from "@helps/DOM";
import {formatTime} from "@helps/format";
import * as React from "react";
import * as styles from "./styles.scss";
import {Danmu} from "../Danmu";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {throttle} from "@helps/performance";
import {
	Container,
	Pic,
	Slide,
	Text,
	Title,
	WatchLater,
	Mask,
} from "./components";

export interface ISpreadCardProps {
	src: string;
	title: string;
	href: string;
	dur: number;
	part?: string;
	playAmount?: number;
	danmuAmount?: number;
}

@observer
export class SpreadCard extends React.Component<ISpreadCardProps> {
	private static progressWidth = 160;
	
	@observable
	private loadDanmu = false;
	
	private danmu: Danmu;
	
	private progressBar: HTMLElement;
	
	@action
	private displayDanmu = (display: boolean) => {
		this.loadDanmu = display;
	}
	
	private setTime = (x: number) => {
		if (this.danmu) {
			this.danmu.setTime(SpreadCard.progressWidth / x);
		}
	}
	
	private preview = throttle(
		(e: React.MouseEvent<HTMLElement>) => {
			const x = getMousePos(e.currentTarget, e).x;
			this.progressBar.style.width = x * 0.625 + "%";
		},
		16.67,
	);
	
	private refDanmu = (com: Danmu) => {
		this.danmu = com;
	}
	
	public render () {
		const {
			      src,
			      title,
			      href,
			      part,
			      dur,
			      playAmount,
			      danmuAmount,
		      } = this.props;
		return (
			<Container onMouseMove={this.preview}>
				<a href={href} title={title}>
					<Pic src={src} title={title} width={160} height={100}/>
					<Title>
						{title}
						
						{part
							? <Slide>{part}</Slide>
							: playAmount
								? (
									<Slide>
										<div className={styles.play}><i className={styles.icon}/>{playAmount}</div>
										<div className={styles.danmu}><i className={styles.icon}/>{danmuAmount}</div>
									</Slide>
								)
								: null
						}
					</Title>
					
					<Mask>
						<div className={styles.progress}>
							<div className={styles.bar} ref={(ele) => this.progressBar = ele}/>
						</div>
						<Text position={"bottomLeft"}>{formatTime(dur)}</Text>
						<WatchLater/>
					</Mask>
				</a>
			</Container>
		);
	}
}
