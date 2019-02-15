import {randomNumber, randomString, randomPic} from "@helps/random";

export function mockMaskCard () {
	return {
		src: randomPic(),
		title: randomString(),
		href: "#",
		author: randomString(),
		playAmount: randomNumber(50000),
	};
}
