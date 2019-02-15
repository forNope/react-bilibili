import {formatDate} from "@helps/format";
import {randomNumber, randomPic, randomString} from "@helps/random";

export function mockPartRankItem (num: number = randomNumber(10)) {
	return {
		num,
		src: randomPic(),
		title: randomString(`全职高手特变片省油住宿
		|斗罗大陆曾百万人追捧的作品,一月将动画化
		|{补番推荐}磁爆步兵杨教授教你撒地方酒叟递减法考虑剑荡四方
		|{动画推荐} 这腿进的都是什莫李兰看电视呢覅偶涉及到佛我加到死了飞机立地成佛`),
		href: "#",
		score: randomNumber(10000),
		date: formatDate(Date.now()),
		origin: randomString(),
		playAmount: randomNumber(2000),
		danmuAmount: randomNumber(2000),
		collectionAmount: randomNumber(2000),
		coinAmount: randomNumber(2000),
	};
}
