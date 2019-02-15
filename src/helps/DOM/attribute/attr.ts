export function attr (el: HTMLElement,
                      property: string,
                      value?: string) {
	if (value) {
		el.setAttribute(property, value);
		return el;
	} else {
		return el.getAttribute(property);
	}
}
