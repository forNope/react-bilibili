export const from = Array.from
	? function (arrayLike: any) {
		return Array.from(arrayLike);
	}
	: function (arrayLike: any) {
		return Array.prototype.slice.call(arrayLike);
	};
