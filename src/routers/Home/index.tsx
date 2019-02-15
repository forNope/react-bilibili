import * as React from "react";
import {mockBangumiShelves} from "@homeComponents/Shelves/BangumiShelves/__mocks__";
import {mockPromotionShelves} from "@homeComponents/Shelves/PromotionShelves/__mocks__";
import {PartShelves, LiveShelves, PromotionShelves, BangumiShelves} from "@homeComponents/Shelves";
import {mockLiveShelves} from "@homeComponents/Shelves/LiveShelves/__mocks__";
import {mockPartShelves} from "@homeComponents/Shelves/PartShelves/__mocks__";
import {PartRankDetail} from "@homeComponents/Rank";
import Nav from "@homeComponents/Navigator";

import {
	ChiefRecommend,
	Promotion,
	Live,
	Anime,
	Bangumi,
	BangumiActive,
	LocalBangumi,
} from "./containers";

const nameTextArr = [
	"直播", "动画",
	"番剧", "国创",
	"音乐", "舞蹈",
	"游戏", "科技",
	"生活", "鬼畜",
	"时尚", "广告",
	"娱乐", "电影",
	"TV剧", "影视",
	"纪录片",
];

const iconBgPosArr: string[] = [
	"-141px -652px", "-141px -908px",
	"-141px -140px", "-141px -140px",
	"-137px -970px", "-141px -332px",
	"-141px -718px", "-140px -1228px",
	"-141px -1032px", "-141px -396px",
	"-141px -845px", "-140px -1356px",
	"-141px -845px", "-140px -1356px",
	"-141px -845px", "-140px -1356px",
	"-140px -1292px",
];

export const Home: React.SFC = (props) => {
	
	return (
		<div className="app-wrapper">
			<ChiefRecommend/>
			<PromotionShelves {...mockPromotionShelves()} />
			{nameTextArr.map((name, i) => {
				switch (name) {
					case "直播":
						return <LiveShelves key={i} {...mockLiveShelves()} />;
					case "番剧":
					case "国创":
						return <BangumiShelves
							key={i}
							{...mockBangumiShelves({
								name,
								backgroundPosition: iconBgPosArr[i],
							})}
						/>;
					default:
						return <PartShelves
							key={i}
							{...mockPartShelves({
								name,
								backgroundPosition: iconBgPosArr[i],
							})}
						/>;
				}
			})}
			<Nav/>
		</div>
	);
};
