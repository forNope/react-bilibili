import * as React from "react";
import * as styles from "./styles.scss";
import * as showImg from "./assets/show.jpg";
import * as listImg1 from "./assets/list1.png";
import * as listImg2 from "./assets/list2.jpg";
import * as listImg3 from "./assets/list3.png";
import * as line from "./assets/line.png";
import * as img1 from "./assets/img1.png";
import * as img2 from "./assets/img2.png";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

@observer
export class GameCenterDetail extends React.Component {
	@observable
	private showImage = "";
	
	@action
	private handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
		this.showImage = e.currentTarget.dataset.img;
	}
	
	@action
	private handleMouseLeave = () => this.showImage = ""
	
	private dataArr = [
		{
			title: "甲铁城的卡巴内瑞",
			img: img1,
		},
		{
			title: "姬十三学院",
			img: img2,
		},
		{
			title: "甲铁城的卡巴内瑞",
			img: img1,
		},
		{
			title: "姬十三学院",
			img: img2,
		},
		{
			title: "甲铁城的卡巴内瑞",
			img: img1,
		},
		{
			title: "姬十三学院",
			img: img2,
		},
		{
			title: "甲铁城的卡巴内瑞",
			img: img1,
		},
		{
			title: "甲铁城的卡巴内瑞",
			img: img1,
		},
	];
	
	public render () {
		return (
			<div className={styles["game-box"]}>
				<div className={styles.left}>
					<div className={styles.banner}>
						<a href="#">
							<img className={styles.img} src={showImg} alt="fate"/>
							<div className={styles.title}>命运冠位指定(Grand Order)</div>
						</a>
					</div>
					
					<div className={styles.brief}>
						<a className={styles.link} href="#">
							<img className={styles.img} src={listImg1} alt="碧海航线"/>
							<p className={styles.title}>碧海航线</p>
						</a>
						
						<a className={styles.link} href="#">
							<img className={styles.img} src={listImg2} alt="神代梦华"/>
							<p className={styles.title}>神代梦华</p>
						</a>
						
						<a className={styles.link} href="#">
							<img className={styles.img} src={listImg3} alt="魔法禁书"/>
							<p className={styles.title}>魔法禁书</p>
						</a>
					</div>
				</div>
				
				<div className={styles.right}>
					<a className={styles["bbs-link"]} href="#">游戏论坛</a>
					
					<div className={styles.all} onMouseLeave={this.handleMouseLeave}>
						{this.dataArr.map((data, i) => (
							<a
								href="#"
								key={i}
								onMouseEnter={this.handleMouseEnter}
								className={styles.link}
								data-img={data.img}
							>
								{data.title}
							</a>
						))}
					</div>
				</div>
				
				<div
					className={styles.character}
					style={{backgroundImage: `url(${this.showImage})`}}
				/>
			</div>
		);
	}
}
