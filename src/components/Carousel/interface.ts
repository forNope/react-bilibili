import {CSSProperties} from "react";

interface ICarouselProps {
	imgList: string[];
	titleList?: string[];
	hrefList?: string[];
	width?: string;
	height?: string;
	titleClassName?: string;
	trigClassName?: string;
	onClassName?: string;
	aniMode?: "carousel" | "fade"; // default carousel
	switchMode?: "click" | "hover"; // default click
	delayMs?: number; // default 3000
}

interface IState {
	index: number;
	timer: number;
}

interface IOverwriteElementProperty {
	className?: string;
	style?: CSSProperties;
	onMouseEnter?: React.MouseEventHandler<HTMLElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLElement>;
	onMouseOver?: React.MouseEventHandler<HTMLElement>;
	onMouseOut?: React.MouseEventHandler<HTMLElement>;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

export {ICarouselProps, IState, IOverwriteElementProperty};
