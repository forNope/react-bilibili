import * as React from "react";
import * as styles from "./styles.scss";
import ScrollView from "@components/ScrollView";

export interface INoticeProps {
	extendsClass?: string;
	matters: Array<{
		text: string;
		href: string;
	}>;
}

export class Notice extends React.Component<INoticeProps> {
	private scrollView: ScrollView;
	private toPre = () => this.scrollView.scrollToPrevious();
	private toNext = () => this.scrollView.scrollToNext();

	private timerID: number;
	private play = () => {
		window.clearInterval(this.timerID);
		this.timerID = window.setInterval(this.toNext, 3000);
	}
	private pause = () => window.clearInterval(this.timerID);

	public render() {
		return (
			<div
				className={`${styles.notice} ${this.props.extendsClass || ""}`}
				onMouseEnter={this.pause}
				onMouseLeave={this.play}
			>
				<div className={styles.pre} onClick={this.toPre} />
				<div className={styles["scroll-container"]}>
					<ScrollView ref={(com) => this.scrollView = com}>
						{this.props.matters.map((matter, i) => (
							<a className={styles.item} href={matter.href} key={i}>{matter.text}</a>
						))}
					</ScrollView>
				</div>
				<div className={styles.next} onClick={this.toNext} />
			</div>
		);
	}

	public componentDidMount() {
		this.play();
	}

	public componentWillUnmount() {
		this.pause();
	}
}
