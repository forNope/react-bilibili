import {getDimension} from "./";

export function getProportion (el: HTMLElement,
                               elContainer: HTMLElement,
                               widthOrHeight: "width" | "height",
                               unit: "decimal" | "percent" = "decimal") {
	return unit === "decimal"
		? getProportionAsDecimal(el, elContainer, widthOrHeight)
		: getProportionAsDecimal(el, elContainer, widthOrHeight) * 100;
}

function getProportionAsDecimal (el: HTMLElement,
                                 elContainer: HTMLElement,
                                 widthOrHeight: "width" | "height") {
	const elDim          = getDimension(el),
	      elContainerDim = getDimension(elContainer);
	
	return widthOrHeight === "height"
		? elDim.height / elContainerDim.height
		: elDim.width / elContainerDim.width;
}
