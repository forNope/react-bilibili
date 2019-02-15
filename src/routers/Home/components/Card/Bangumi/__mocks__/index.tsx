import {randomNumber, randomPic, randomString} from "@helps/random";

export function mockBangumiCard () {
	return {
		src: randomPic(),
		title: randomString("比宇宙更远的地方|卫宫家今天的饭|美妙天堂 偶像时刻|Wake UP|狼与香辛料"),
		href: "#",
		detailHref: "#",
		updateTo: randomNumber(12) + "话",
	};
}
