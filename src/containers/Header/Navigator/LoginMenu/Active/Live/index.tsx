import {randomPic, randomString} from "@helps/random";
import * as React from "react";
import {Item} from "./Item";

const getData = (length: number) => {
	return Array(length)
		.fill(null)
		.map(() => ({
			avatar: randomPic(),
			name: randomString("小丑|长文字车市长文字车市长文字车市长文字车市长文字车市长文字车市长文字车市长文字车市长文字车市"),
			liveState: randomString("正在直播|轮播投稿视频中|休息中"),
			signature: randomString("测试签名|长签名测试长签名测试长签名测试长签名测试长签名测试长签名测试长签名测试"),
			liveLink: "#",
		}));
}

export const Live: React.SFC = () => (
	<div>
		{getData(5).map((data, i) => <Item key={i} {...data}/>)}
	</div>
);
