export function randomNumber(max: number, min: number = 0): number {
	return min + Math.ceil(Math.random() * (max - min));
}
