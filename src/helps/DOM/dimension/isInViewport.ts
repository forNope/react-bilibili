export function isInViewport (el: HTMLElement, offset: {
	x?: number,
	y?: number,
} = {
	x: 0,
	y: 0,
}) {
	const rect   = el.getBoundingClientRect(),
	      height = window.innerHeight || document.documentElement.clientHeight,
	      width  = window.innerWidth || document.documentElement.clientWidth,
	      {x, y} = offset;
	
	return (
		rect.bottom > (0 - y)
		&& rect.top < (height + y)
		&& rect.right > (0 - x)
		&& rect.left < (width + x)
	);
}	
