export type ICommentData = {
	color?: string;
	speed?: number;
	size?: number;
	liveTime?: number;
	time: number;
	mode: number;
	content: string;
};

export type IComment = {
	el: HTMLElement;
	mode: number;
	animationEnd? (): void;
	update? (x: number): void;
	isUsing: boolean;
	speed?: number
	liveTime?: number;
	UI?: {
		width: number;
		x: number;
	};
};

export type IRoad = {
	appendChild (comment: IComment): void;
	removeChild (comment: IComment): void;
	placeHolder (comment: IComment): Function;
	children: Array<IComment>;
};
