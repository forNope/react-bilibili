import * as React from "react";
import * as ReactDOM from "react-dom";
import Header from "@containers/Header";
import {Home} from "./routers/Home";
import {Video} from "./routers/Video";
import "./scss/index.scss";
import DOMCount from "@components/DOMCount";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Footer} from "@containers/Footer";

ReactDOM.hydrate(
	<Header/>,
	document.getElementById("_header"),
);

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/video" component={Video}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("_app"),
);

ReactDOM.hydrate(
	<Footer/>,
	document.getElementById("_footer"),
);

function getDOMCount () {
	const test = document.createElement("div");
	test.id = "_test";
	document.body.appendChild(test);
	
	ReactDOM.render(
		<DOMCount root={document.querySelector("#_app")}/>,
		document.querySelector("#_test"),
	);
}

function setDocWidth () {
	document.documentElement.style.width = window.screen.width + "px";
}

/**
 * lazy evaluation test
 */
// const arr = [1, 2, [3, 4, [5, 6, [7, 6]]]];
// const bigArr = Array(10000)
// 	.fill(Array(10000)
// 		.fill(Array(10000)));
//
// (window as any).arr = arr;
// (window as any).bigArr = bigArr;
// (window as any).lazy = lazy;

setDocWidth();
