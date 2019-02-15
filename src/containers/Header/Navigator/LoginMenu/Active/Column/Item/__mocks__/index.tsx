import {randomPic, randomString} from "@helps/random";

export function mockItem () {
	return {
		cover: randomPic(),
		name: randomString("美希命|小遥感三人|听说名字很长躲在树后才不会被发现"),
		spaceLink: "#no",
		columnLink: "#noVideo",
		title: randomString("第五章 胶泥打猎|文案小白必备的标题公式| 七个公式跟你平时在朋友圈里看到那些"),
		state: "投稿了",
	};
}
