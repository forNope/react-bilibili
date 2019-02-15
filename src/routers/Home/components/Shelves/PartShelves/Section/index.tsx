import {DynamicLoad} from "@components/Lazyload";
import * as React from "react";
import * as styles from "./styles.scss";
import {debounce} from "@helps/performance";
import {action, observable} from "mobx";
import {IPartRankItemProps, PartRankItem} from "@homeComponents/Rank/PartRankItem";
import {observer} from "mobx-react";
import {GrayMoreBtn} from "@homeComponents/Rank";
import {Title, Name, SwitchOpt} from "@homeComponents/Shelves/components";
import {Tabs, Tab, TabPanel} from "@components/Tabs";

type IDataFn = () => Array<IPartRankItemProps>;

export interface ISectionProps {
	site: {
		day3: IDataFn;
		week: IDataFn;
	};
	original: {
		day3: IDataFn;
		week: IDataFn;
	};
}

@observer
export class Section extends React.Component<ISectionProps> {
	@observable
	private date = "day3";
	
	@action
	private switchDate = (index: number) => {
		this.date = index === 0 ? "day3" : "week";
	}
	
	public render () {
		const date             = this.date,
		      {site, original} = this.props;
		
		return (
			<Tabs>
				<div>
					<Title>
						<Name text={"排行"} small/>
						<Tab>全站</Tab>
						<Tab>原创</Tab>
						<SwitchOpt
							textArr={["三日", "一周"]}
							switchOptCb={this.switchDate}
						/>
					</Title>
					<DynamicLoad height={"326px"} offset={100}>
						<div>
							<TabPanel>
								{date === "day3"
									? (site.day3().map((data, i) => (
										<PartRankItem {...data} key={i}/>
									)))
									: (site.week().map((data, i) => (
										<PartRankItem {...data} key={i}/>
									)))}
							</TabPanel>
							<TabPanel>
								{date === "day3"
									? (original.day3().map((data, i) => (
										<PartRankItem {...data} key={i}/>
									)))
									: (original.week().map((data, i) => (
										<PartRankItem {...data} key={i}/>
									)))}
							</TabPanel>
							<GrayMoreBtn/>
						</div>
					</DynamicLoad>
				</div>
			</Tabs>
		);
	}
}
