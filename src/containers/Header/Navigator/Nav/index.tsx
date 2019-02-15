import {Transition} from "@components/Animation/Base/Transition";
import * as React from "react";
import * as styles from "./styles.scss";
import {Item} from "../components";
import {HoverLoad} from "@components/Lazyload";
import {GameCenterDetail} from "./GameCenterDetail";
import {QRCode} from "./QRCode";

const navArr = [
	"主站",
	"画友", "游戏中心",
	"直播", "会员购",
	"下载APP",
];

export const Nav: React.SFC = () => (
	<div>
		{navArr.map((name, i) => {
			switch (name) {
				case "主站":
					return (
						<Item
							text={name}
							href={"/"}
							icon={{position: "-919px -88px"}}
							key={i}
						/>
					);
				case "游戏中心":
					return (
						<Item
							text={name}
							key={i}
							appendElement={<GameCenterDetail/>}
						/>
					);
				case "下载APP":
					return (
						<Item
							text={name}
							icon={{position: "-1367px -1175px"}}
							appendElement={<QRCode/>}
							key={i}
						/>
					);
				default:
					return <Item text={name} key={i}/>;
			}
		})}
	</div>
);
