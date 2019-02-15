import * as React from "react";
import {mockPartShelves} from "@homeComponents/Shelves/PartShelves/__mocks__";
import {PartShelves} from "@homeComponents/Shelves";

export const Anime: React.SFC = () => (
	<PartShelves
		{...mockPartShelves({
			name: "动画",
			backgroundPosition: "-141px -908px",
		})}
	/>
);
