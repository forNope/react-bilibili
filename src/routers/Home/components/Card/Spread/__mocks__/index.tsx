import {randomNumber, randomPic, randomString} from "@helps/random";

export function mockSpreadCard (hasPart?: boolean,
                                hasPlayAmount?: boolean,
                                hasDanmuAmount?: boolean) {
	return {
		src: randomPic(),
		title: randomString(`
		Aimer Live in 武道鲸
		|{肛琴}电影芳年什么墨连连看你啥地方
		|FATE GRAND ORDER 献祭会
		|以杨教授为切入点 这部名为 理想禁区的什莫连世纪东方计算机东澳岛酒叟覅吉萨豆浆粉	`),
		href: "#",
		dur: randomNumber(20000),
		part: hasPart
			? randomString(`
		娱乐※唱见
		|游戏※绝地求生:大逃杀
		|娱乐※日常
		|娱乐※学习`)
			: null,
		playAmount: hasPlayAmount ? randomNumber(2000) : null,
		danmuAmount: hasDanmuAmount ? randomNumber(2000) : null,
	};
}
