import * as React from "react";
import {mockBangumiShelves} from "@homeComponents/Shelves/BangumiShelves/__mocks__";
import {eachPush} from "@helps/array";
import {BangumiShelves} from "@homeComponents/Shelves/BangumiShelves";

export const Bangumi: React.SFC = () => (
	<BangumiShelves {...mockBangumiShelves({backgroundPosition: "-141px -140px"})}/>
);
