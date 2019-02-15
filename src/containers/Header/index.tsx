import * as React from "react";
import {Navigator} from "./Navigator";
import {Banner} from "./Banner";
import {PartMenu} from "./PartMenu";

export default function Header () {
	return (
		<div>
			<Navigator/>
			<Banner/>
			<PartMenu/>
		</div>
	);
}
