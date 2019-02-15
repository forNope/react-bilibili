import {ISpreadCardProps} from "@homeComponents/Card/Spread";
import * as React from "react";
import {SpreadCard} from "@homeComponents/Card";
import {Title, Icon, Name} from "@homeComponents/Shelves/components";

export interface IMainProps {
	getData (): Array<ISpreadCardProps>;
}

export const Main: React.SFC<IMainProps> = ({getData}) => (
	<div>
		<Title>
			<Icon backgroundPosition={"-141px -75px"}/>
			<Name text={"推广"}/>
		</Title>
		<div>
			{getData().map((data, i) => (
				<SpreadCard {...data} key={i}/>
			))}
		</div>
	</div>
);

// height: 165px
