import * as React from "react";
import {Title, List, ListItem} from "@containers/Footer/component";

const list = [
	"关于我们", "联系我们", "加入我们",
	"友情链接", "官方认证", "investor relations",
];

export const AboutUs: React.SFC = () => (
	<div>
		<Title>bilibili</Title>
		<List>
			{list.map((text, i) => (
				<ListItem key={i} href={"#"}>{text}</ListItem>
			))}
		</List>
	</div>
);
