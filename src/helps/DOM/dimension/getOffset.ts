export function getOffset (el: HTMLElement) {
	const rect   = el.getBoundingClientRect(),
	      win    = el.ownerDocument.defaultView,
	      top    = rect.top + win.pageYOffset,
	      left   = rect.left + win.pageXOffset,
	      right  = left + rect.width,
	      bottom = top + rect.height;

	return {
		top,
		right,
		bottom,
		left,
	};
}
