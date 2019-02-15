export interface ICurvePoint {
	x: number;
	y: number;
}

export function drawCurvePath(
	ctx: CanvasRenderingContext2D,
	start: ICurvePoint,
	end: ICurvePoint,
	curvature: number,
	percent: number) {
	const cp: ICurvePoint = {
		x: (start.x + end.x) / 2 - (start.y - end.y) * curvature,
		y: (start.y + end.y) / 2 - (start.x - end.x) * curvature,
	};

	const t = percent / 100;

	const p0 = start,
	      p1 = cp,
	      p2 = end;

	const v01 = {
		x: p1.x - p0.x,
		y: p1.y - p0.y,
	},
	v12 = {
		x: p2.x - p1.x,
		y: p2.y - p1.y,
	};

	const q0 = {
		x: p0.x + v01.x * t,
		y: p0.y + v01.y * t,
	},
	q1 = {
		x: p1.x + v12.x * t,
		y: p1.y + v12.y * t,
	};

	const v = {
		x: q1.x - q0.x,
		y: q1.y - q0.y,
	};

	const b = {
		x: q0.x + v.x * t,
		y: q0.y + v.y * t,
	};

	ctx.moveTo(p0.x, p0.y);

	ctx.quadraticCurveTo(q0.x, q0.y, b.x, b.y);
}
