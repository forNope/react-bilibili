import * as React from "react";
import * as styles from "./styles.scss";
import { observer } from "mobx-react";
import { observable } from "mobx";

export interface IDOMCountProps {
	root?: Element;
}

@observer
export default class DOMCount extends React.Component<IDOMCountProps> {
	public static defaultProps = {
		root: document.body,
	};

	@observable private count: number = 0;
	private timerID: number;
	private ctx: CanvasRenderingContext2D;
	private easeNum: number = 0;
	private width: number;
	private height: number;
	private proportion = 100;

	public getDOMCount = () => {
		this.count = this.props.root.getElementsByTagName("*").length;
	}

	public draw = () => {
		const ctx = this.ctx,
			easeNum = this.easeNum,
			count = this.count;

		this.getDOMCount();
		this.easeNum = this.easeNum >= this.width ? this.width : ++this.easeNum;

		const img = ctx.getImageData(0, 0, this.width, this.height);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.restore();
		ctx.putImageData(img, -10, 0);
		ctx.fillRect(0, 0, 10, this.count / this.proportion);
		this.timerID = requestAnimationFrame(this.draw);
	}

	public render() {
		return (
			<div className={styles.container}>
				<p>DOM数量:{this.count}</p>
				<canvas
					className={styles.canvas}
					width={100}
					height={80}
					ref={(ele) => {
						if (!this.ctx) {
							this.ctx = ele.getContext("2d");
							this.width = ele.width;
							this.height = ele.height;
						}
					}}
				/>
			</div>
		);
	}

	public componentDidMount() {
		const ctx = this.ctx;
		ctx.fillStyle = "green";
		ctx.translate(this.width, this.height);
		ctx.rotate(Math.PI);
		// ctx.fillRect(0, 0, 20, 60);
		this.draw();
	}

	public componentWillUnmount() {
		cancelAnimationFrame(this.timerID);
	}
}
