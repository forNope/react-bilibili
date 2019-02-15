import { IVInfoProps } from "../";
import { randomString, randomNumber, randomDate } from "@helps/random";

export function mockVInfo(): IVInfoProps {
	return {
		title: randomString(),
		priPart: randomString("动画|电影|番剧|游戏|科技|生活"),
		secPart: randomString("MMV MMD|综合|单机游戏|电子竞技|趣味科普人文|数码|星海"),
		create: randomDate(),
		num: {
			play: randomNumber(10000),
			danmu: randomNumber(3000),
			coin: randomNumber(3000),
			collection: randomNumber(4000),
		},
	};
}
