import * as React from "react";
import * as styles from "./styles.scss";
import * as gif from "./assets/show-tv.gif";
import {SubNav} from "./SubNav";

export function PartMenu () {
	const menuName     = [
		      "动画", "番剧", "国创", "音乐",
		      "舞蹈", "游戏", "科技", "生活",
		      "鬼畜", "时尚", "广告", "娱乐",
		      "影视", "放映厅",
	      ],
	      subMenuName  = [
		      ["MAD·AMV", "MMD·3D", "短片·手书·配音", "综合"],
		      ["完结动画", "测试"], ["国产动画", "测试"],
		      ["音乐", "测试"], ["舞蹈", "测试"],
		      ["游戏", "测试"], ["科技", "测试"],
		      ["生活", "测试"], ["鬼畜", "测试"],
		      ["时尚", "测试"], ["广告", "测试"],
		      ["娱乐", "测试"], ["影视", "测试"],
		      ["放映厅", "测试"],
	      ],
	      sideMenuName = ["专栏", "广场", "直播", "小黑屋"],
	      sideMenuIcon = ["column-icon", "square-icon", "live-icon", "banned-icon"];
	
	return (
		<div className={`${styles.container} app-wrapper`}>
			<ul className={styles.menu}>
				<li className={styles.item}>
					<a href="/">
						<div className={styles["num-box"]}>
							<i className={`${styles.icon} ${styles["home-icon"]}`}/>
						</div>
						<div className={styles.name}>首页</div>
					</a>
				</li>
				
				{menuName.map((menuName: string, i: number) => {
					return (
						<li className={styles.item} key={i}>
							<a href={"#" + menuName}>
								<div className={styles["num-box"]}>
									<span className={styles.num}>--</span>
								</div>
								<div className={styles.name}>{menuName}</div>
							</a>
							
							<SubNav
								names={subMenuName[i]}
								hrefList={subMenuName[i].map((href: string) => "#" + href)}
							/>
						</li>
					);
				})}
				
				{sideMenuName.map((sideMenuName: string, i: number) => {
					return (
						<li className={styles.item} key={"side" + i}>
							<a href="#">
								<div className={styles["num-box"]}>
									<i className={`${styles.icon} ${styles[sideMenuIcon[i]]}`}/>
								</div>
								<div className={styles.name}>
									{sideMenuName}
								</div>
							</a>
						</li>
					);
				})}
				
				<li>
					<a href="#">
						<img src={gif}/>
					</a>
				</li>
			</ul>
		</div>
	);
}
