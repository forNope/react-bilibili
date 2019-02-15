import {randomNumber, randomString} from "@helps/random";
import {IBangumiCardProps} from "@homeComponents/Card/Bangumi";
import * as React from "react";
import {eachPush} from "@helps/array";
import {BangumiCard} from "@homeComponents/Card";
import {mockBangumiCard} from "@homeComponents/Card/Bangumi/__mocks__";
import {GrayMoreBtn} from "@homeComponents/Rank";
import {mockBangumiRankItem} from "@homeComponents/Rank/BangumiRankItem/__mocks__";

function getData (length: number) {
	return new Array(length)
		.fill(null)
		.map(() => mockBangumiCard());
}

export function mockBangumiShelves (options: {
	name?: string,
	rows?: number,
	backgroundImage?: string,
	backgroundPosition?: string,
}) {
	const {
		      name               = randomString("番剧|国创"),
		      rows               = 4,
		      backgroundPosition = "-141px -908px",
		      backgroundImage,
	      } = options;
	
	const getData = function () {
		return new Array(randomNumber(20))
			.fill(null)
			.map(() => mockBangumiCard());
	};
	
	const getRankData = function (type: any) {
		return Array(type === "day3" ? 5 : 9)
			.fill(null)
			.map((_, i) => mockBangumiRankItem(i + 1));
	}
	
	return {
		name,
		backgroundPosition,
		backgroundImage,
		getData,
		getRankData,
		rows,
	};
}
