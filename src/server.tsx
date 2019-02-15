import * as React from "react";
import {renderToString, renderToStaticMarkup} from "react-dom/server";
import * as Koa from "koa";
import * as Router from "koa-router";
import {chiefCarousel} from "./app/routes/chiefCarousel";
import Header from "@containers/Header";
import {Footer} from "@containers/Footer";
import {config} from "./app/config";

const app = new Koa();
const header = renderToString(<Header/>);
const footer = renderToString(<Footer/>);
const router = new Router();

const body = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1">
    <meta name="keywords" content="bilibili,影视,动漫">
    <meta name="description" content="二次元,同志交友网站">
    <title>bilibili</title>
    <link rel="stylesheet" href="${config.staticPublicPath}stylesheets/main.css">
</head>
<body>
<div id="_header">${header}</div>
<div id="_app"></div>
<div id="_footer">${footer}</div>
<script src="${config.staticPublicPath}main.js"></script>
</body>
</html>
`;

async function renderPage (ctx: Koa.Context, next: Function) {
	ctx.body = body;
	await next();
}

router.use("/chiefRecommend", chiefCarousel.routes());

app
	.use(renderPage)
	.use(router.routes())
	.listen(3000);
