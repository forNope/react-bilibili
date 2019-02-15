import {IBangumiRankItemProps} from "@homeComponents/Rank/interface";
import * as React from "react";
import {Title, Name, SwitchOpt} from "@homeComponents/Shelves/components";
import {BangumiRankItem} from "@homeComponents/Rank";
import {observable} from "mobx";
import {observer} from "mobx-react";

type IDate = "week" | "day3";

export interface ISectionProps {
	getRankData (type: IDate): Array<IBangumiRankItemProps>;
}

@observer
export class Section extends React.Component<ISectionProps> {
	@observable
	private date: IDate = "day3";
	
	private switchOpt = (index: number) => {
		this.date = index === 0 ? "day3" : "week";
	}
	
	public render () {
		return (
			<div>
				<Title>
					<Name text={"排行"} small/>
					
					<SwitchOpt
						textArr={["三日", "一周"]}
						switchOptCb={this.switchOpt}
					/>
				</Title>
				<div>
					{this.props.getRankData(this.date).map((data, i: number) => (
						<BangumiRankItem {...data} key={i}/>
					))}
				</div>
			</div>
		);
	}
}
