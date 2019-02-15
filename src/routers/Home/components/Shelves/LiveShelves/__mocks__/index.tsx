import {mockCarousel} from "@components/Carousel/__mocks__";
import {eachPush} from "@helps/array";
import {randomNumber} from "@helps/random";
import {formatNumber} from "@helps/format";
import {mockSpreadCard} from "@homeComponents/Card/Spread/__mocks__";
import {mockLiveRankItem} from "@homeComponents/Rank/LiveRankItem/__mocks__";

export function mockLiveShelves () {
	function getCardData (length: number) {
		return new Array(length)
			.fill(null)
			.map(() => mockSpreadCard(true));
	}
	
	function getRankItemData (length: number, hasNum?: boolean) {
		return new Array(length)
			.fill(null)
			.map((_, i) => mockLiveRankItem(hasNum ? i + 1 : null));
	}
	
	return {
		getData: () => getCardData(10),
		getRankData: () => getRankItemData(5, true),
		getAttentionData: () => getRankItemData(5),
		liveNum: randomNumber(50000),
	};
}
