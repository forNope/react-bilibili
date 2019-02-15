import {
	randomNumber,
	randomString,
	randomPic,
} from "@helps/random";
import { IBangumiRankItemProps } from "@homeComponents/Rank/interface";

export function mockBangumiRankItem(num?: number): IBangumiRankItemProps {
	return {
		num,
		title: randomString("比宇宙更远的地方|卫宫家今天的饭|美妙天堂 偶像时刻|Wake UP|狼与香辛料"),
		updateTo: randomNumber(12) + "话",
	};
}
