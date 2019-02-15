import * as React from "react";
import * as styles from "./styles.scss";
import * as avatarImg from "./assets/akari.jpg";
import {Item} from "../components";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {HoverLoad} from "@components/Lazyload";
import {LoginTip} from "./LoginTip";
import {Recommend} from "./Recommend";
import {Message} from "./Message";
import {Upload} from "./Upload";
import {History} from "./History";
import {Collection} from "./Collection";
import {LaterWatch} from "./LaterWatch";
import {Active} from "./Active";

@observer
export class LoginMenu extends React.Component {
	private isLogin = false;
	
	public render () {
		return (
			<div className={styles["login-menu"]}>
				<div className={styles.login}>
					<a className={styles["avatar-box"]} href="#">
						<img className={styles.avatar} src={avatarImg}/>
					</a>
					<HoverLoad isAlwaysRender>
						<LoginTip/>
					</HoverLoad>
				</div>
				
				<Item text={"大会员"} appendElement={<Recommend/>}/>
				<Item text={"消息"} appendElement={<Message/>}/>
				<Item text={"动态"}>
					<Active/>
				</Item>
				<Item text={"稍后再看"} appendElement={<LaterWatch/>}/>
				<Item text={"收藏夹"} appendElement={<Collection/>}/>
				<Item text={"历史"} appendElement={<History/>}/>
				<Item text={"投稿"} className={styles.upload} appendElement={<Upload/>}/>
			</div>
		);
	}
}
