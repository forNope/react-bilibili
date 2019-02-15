export function hasStyle (el: HTMLElement,
                          styles: string,
                          matchMode: "all" | "part" = "all") {
	const cssText = el.style.cssText;
	return matchMode === "all"
		? styles.split(" ").every((style) => {
			return !!~cssText.indexOf(style);
		})
		: styles.split(" ").some((style) => {
			return !!~cssText.indexOf(style);
		});
}
