import {ISpreadCardProps} from "@homeComponents/Card/Spread";
import * as React from "react";
import {SpreadCard} from "@homeComponents/Card";
import {mockSpreadCard} from "@homeComponents/Card/Spread/__mocks__";
import {
	Title,
	Icon,
	Name,
	Text,
	Link,
	UpdateBtns,
} from "@homeComponents/Shelves/components";

export interface IMainProps {
	liveNum: number;
	
	getData (): Array<ISpreadCardProps>;
}

export const Main: React.SFC<IMainProps> = ({
	                                            liveNum,
	                                            getData,
                                            }) => {
	return (
		<div>
			<Title>
				<Icon backgroundPosition={"-141px -652px"}/>
				<Name text={"正在直播"} href={"#live"}/>
				<Text text={"当前共有"}/>
				<Text text={liveNum.toString()} primary/>
				<Text text={"个在线直播"}/>
				<Link text={"233秒居然能做这些"} hasIcon/>
				<UpdateBtns/>
			</Title>
			<div>
				{getData().map((data, i) => (
					<SpreadCard {...data} key={i}/>
				))}
			</div>
		</div>
	);
};
