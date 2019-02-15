import {randomNumber, randomPic, randomString} from "@helps/random";
import {formatNumber} from "@helps/format";
import {ILiveRankProps} from "@homeComponents/Rank/interface";

export function mockLiveRankItem (num?: number): ILiveRankProps {
	return {
		src: randomPic(),
		name: randomString(`
		宫本狗雨
		|梦醒三生最
		|半本书
		|这个黑岩不太冷`),
		num,
		signature: randomString(),
		playVolume: formatNumber(randomNumber(95123485)),
	};
}
