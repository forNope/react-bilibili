import * as React from "react";
import {Title, List, ListItem} from "@containers/Footer/component";

const list = [
	"帮助中心", "高级弹幕", "活动专题页",
	"侵权申诉", "分院帽计划", "活动中心",
	"用户反馈论坛", "壁纸站", "名人堂",
]

export const Helps: React.SFC = () => (
	<div>
		<Title>传送门</Title>
		<List>
			{list.map((text, i) => (
				<ListItem href={"#"} key={i}>{text}</ListItem>
			))}
		</List>
	</div>
);
