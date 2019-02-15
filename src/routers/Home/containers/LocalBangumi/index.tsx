import * as React from "react";
import {eachPush} from "@helps/array";
import {mockBangumiShelves} from "@homeComponents/Shelves/BangumiShelves/__mocks__";
import {BangumiShelves} from "@homeComponents/Shelves";

export const LocalBangumi: React.SFC = () => (
	<BangumiShelves
		{...mockBangumiShelves({
			backgroundPosition: "-141px -1032px",
			rows: 3,
		})}
	/>
);
