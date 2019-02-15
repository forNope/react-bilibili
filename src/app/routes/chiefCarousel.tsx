import * as Router from "koa-router";

export const chiefCarousel: Router = new Router();

interface InterDataType {
	title: string[];
	href: string[];
	src: string[];
}

chiefCarousel.get("/RecommendCarousel", async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
	const prefix: string = "http://127.0.0.1:8080/assets/recommend/";
	const testData: InterDataType = {
		title: ["测试1", "测试图片2", "我的妈呀"],
		href: ["#", "#vide", "#pic3"],
		src: [prefix + "27.jpg", prefix + "28.jpg", prefix + "36.jpg"],
	};
	
	ctx.body = testData;
	ctx.status = 200;
	await next();
});
