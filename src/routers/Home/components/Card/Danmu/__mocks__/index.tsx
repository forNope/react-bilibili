import {eachPush} from "@helps/array";
import {randomString, randomNumber} from "@helps/random";

export function mockDanmu (length: number = 100) {
	return {
		dataArr: new Array(length)
			.fill(null)
			.map(() => ({
				text: randomString(),
				time: randomNumber(2000),
			})),
	};
}
