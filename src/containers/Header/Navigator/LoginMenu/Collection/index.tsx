import {randomString} from "@helps/random";
import * as React from "react";
import {Container, Link} from "../components";

export const Collection: React.SFC = () => (
	<Container more={{hasIcon: true}}>
		<Link text={randomString()} href={"#"}/>
		<Link text={randomString()} href={"#"}/>
		<Link text={randomString()} href={"#"}/>
		<Link text={randomString()} href={"#"}/>
	</Container>
);
