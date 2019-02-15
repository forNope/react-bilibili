import {CSSProperties} from "react";

interface ISerialProps {
	num: number;
}

interface IPartRankDetailVolume {
	play: number | string;
	danmu: number | string;
	collection: number | string;
	coin: number | string;
}

interface IPartRankDetailDesc {
	title: string;
	date: string;
	origin: string;
	desc: string;
}

interface IShowPartDetailData {
	position?: {
		top: string;
		left: string;
	};
	detail?: IPartRankDetailDesc;
	volume?: IPartRankDetailVolume;
}

interface ILiveRankProps extends ISerialProps {
	src?: string;
	name?: string;
	href?: string;
	signature?: string;
	playVolume?: string | number;
}

interface IZoneRankMoreData {
	href?: string;
}

interface IPartRankItemProps extends ISerialProps {
	src?: string;
	title?: string;
	href?: string;
	score?: string | number;
	origin: string;
	date: string;
	volume: IPartRankDetailVolume;
	
	mouseEnterCb?(offsetTop: number, takeUpHeight: number, data: {
		title: string;
		origin: string;
		date: string;
		src: string;
		description: string;
		volume: IPartRankDetailVolume;
	}): void;
}

interface IBangumiRankItemProps extends ISerialProps {
	title: string;
	href?: string;
	updateTo?: string;
}

export {
	ISerialProps,
	ILiveRankProps,
	IZoneRankMoreData,
	IBangumiRankItemProps,
	IPartRankItemProps,
	IShowPartDetailData,
	IPartRankDetailVolume,
	IPartRankDetailDesc,
};
