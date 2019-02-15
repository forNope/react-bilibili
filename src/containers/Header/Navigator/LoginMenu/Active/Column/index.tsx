import {createKey} from "@helps/crypto";
import {randomString, randomPic} from "@helps/random";
import * as React from "react";
import {Item} from "./Item";
import {DataContainer} from "../components";
import {mockItem} from "./Item/__mocks__";

function getData (length: number) {
	return Array(length)
		.fill(null)
		.map(() => <Item key={createKey()} {...mockItem()}/>);
}

function requestData () {
	return new Promise((resolve) => {
		setTimeout(() => resolve(getData(5)), 2000);
	});
}

export const Column: React.SFC = () => (
	<DataContainer
		renderNew={getData(5)}
		renderHistory={getData(5)}
		getDataFn={requestData}
	/>
);
