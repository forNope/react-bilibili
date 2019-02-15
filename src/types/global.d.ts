declare module "*.scss" {
	const value: { [className: string]: string };
	export = value;
}

declare module "*.png" {
	const value: string;
	export = value;
}

declare module "*.jpg" {
	const value: string;
	export = value;
}

declare module "*.gif" {
	const value: string;
	export = value;
}

declare module "*.jpeg" {
	const value: string;
	export = value;
}

declare module "*.webp" {
	const value: string;
	export = value;
}

declare module "*.mp4" {
	const value: string;
	export = value;
}

type ReactComponent = React.ComponentClass | React.SFC;
type ReactElement = React.ReactNode | JSX.Element;

interface IMouseEvents {
	onMouseEnter?: React.MouseEventHandler<HTMLElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLElement>;
	onMouseOver?: React.MouseEventHandler<HTMLElement>;
	onMouseOut?: React.MouseEventHandler<HTMLElement>;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

interface IResource {
	src?: string;
	title?: string;
	href?: string;
}

interface Document {
	fullscreen: boolean;
	fullScreen: boolean;
	mozFullScreen: boolean;
	
	mozCancelFullScreen (): void;
	
	cancelFullScreen (): void;
}

interface Element {
	requestFullScreen (): void;
	
	mozRequestFullScreen (): void;
}

type anyObj<T = any> = { [key: string]: T };
