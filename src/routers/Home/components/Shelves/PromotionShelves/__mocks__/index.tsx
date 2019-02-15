import {eachPush} from "@helps/array";
import {randomNumber, randomPic} from "@helps/random";
import {mockSpreadCard} from "@homeComponents/Card/Spread/__mocks__";

export function mockPromotionShelves () {
	return {
		getData: () => new Array(10).fill(null).map(() => mockSpreadCard()),
		onlineNum: randomNumber(500000),
		latestUploadNum: randomNumber(20000),
		pic: randomPic(),
		picHref: "#Void",
	};
}
