interface IMaskCardProps extends IResource {
	author: string;
	playVolume: string | number;
}

interface ISpreadCardProps extends IResource {
	time?: string;
	part?: string;
	volume?: {
		play?: string | number;
		danmu?: string | number;
	};
}

interface IBangumiCardProps extends IResource {
	detailHref?: string;
	updateTo?: string;
}

export {IMaskCardProps, ISpreadCardProps, IBangumiCardProps};
