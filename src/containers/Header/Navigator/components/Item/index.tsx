import {Transition} from "@components/Animation/Base/Transition";
import {getOriginEl, isOriginEl, isSFC, mergeProps} from "@helps/React";
import {mergeComponentProps} from "@helps/React/mergeComponentProps";
import {isSsr} from "@helps/support";
import * as React from "react";
import * as iconImg from "@assets/icons.png";
import * as styles from "./styles.scss";
import {HoverLoad} from "@components/Lazyload";

interface IItemProps {
	className?: string;
	text?: string;
	href?: string;
	icon?: {
		image?: string;
		position?: string;
		className?: string;
	};
	appendElement?: React.ReactElement<any> | any;
}

export const Item: React.SFC<IItemProps> = ({
	                                            children,
	                                            className = "",
	                                            text,
	                                            href = "#",
	                                            icon,
	                                            appendElement,
                                            }) => (
	<div className={`${className} ${styles.item}`}>
		<a className={styles.link} href={href}>
			{icon
				? <i
					className={`${icon.className || ""} ${styles.icon}`}
					style={{
						backgroundImage: `url(${icon.image || iconImg})`,
						backgroundPosition: icon.position || "",
					}}
				/>
				: null}
			{text || ""}
		</a>
		{appendElement
			? (
				<HoverLoad isAlwaysRender>
					{isSFC(appendElement) || isOriginEl(appendElement)
						? mergeProps(getOriginEl(appendElement), {"data-role": "append"})
						: mergeComponentProps(appendElement, {"data-role": "append"})}
				</HoverLoad>
			)
			: null}
		{children}
	</div>
);
