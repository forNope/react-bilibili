import {ISpreadCardProps} from "@homeComponents/Card/interface";
import {IPartRankItemProps} from "@homeComponents/Rank/interface";
import * as React from "react";
import {eachPush} from "@helps/array";
import {randomString} from "@helps/random";
import {mockSpreadCard} from "@homeComponents/Card/Spread/__mocks__";
import {PartRankItem} from "@homeComponents/Rank/PartRankItem";
import {mockPartRankItem} from "@homeComponents/Rank/PartRankItem/__mocks__";

export function mockPartShelves (options: {
	name?: string;
	backgroundPosition?: string;
}) {
	const {
		      name = randomString("动画|音乐|游戏|舞蹈|科技|生活"),
		      backgroundPosition,
	      } = options;
	
	function getCardData (length: number) {
		return new Array(length).fill(null).map(() => mockSpreadCard(true));
	}
	
	function getRankItemData (length: number) {
		return new Array(length).fill(null).map((_, i) => mockPartRankItem(i + 1));
	}
	
	return {
		name,
		backgroundPosition,
		getLatestActiveData: () => getCardData(10),
		getLatestUploadData: () => getCardData(10),
		site: {
			day3: () => getRankItemData(5),
			week: () => getRankItemData(7),
		},
		original: {
			day3: () => getRankItemData(5),
			week: () => getRankItemData(7),
		},
	};
}
