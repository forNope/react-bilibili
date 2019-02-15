import {DynamicLoad} from "@components/Lazyload";
import * as React from "react";
import * as styles from "./styles.scss";
import {observer} from "mobx-react";
import {observable, action} from "mobx";
import {SpreadCard} from "@homeComponents/Card";
import {ISpreadCardProps} from "@homeComponents/Card/Spread";
import {
	Title,
	Icon,
	Name,
	UpdateBtns,
} from "@homeComponents/Shelves/components";
import {Tabs, Tab, TabPanel} from "@components/Tabs";

export interface IMainProps {
	backgroundPosition?: string;
	name?: string;
	nameHref?: string;
	
	getLatestUploadData (): Array<ISpreadCardProps>;
	
	getLatestActiveData (): Array<ISpreadCardProps>;
}

@observer
export class Main extends React.Component<IMainProps> {
	@observable
	private index = 0;
	
	@action
	private setIndex = (index: number) => this.index = index
	
	private switchTab = (index: number) => this.setIndex(index);
	
	public render () {
		const {
			      backgroundPosition,
			      name,
			      nameHref,
			      getLatestActiveData,
			      getLatestUploadData,
		      } = this.props;
		return (
			<Tabs>
				<div>
					<Title>
						<Icon backgroundPosition={backgroundPosition}/>
						<Name text={name} href={nameHref}/>
						<Tab>有新动态</Tab>
						<Tab>最新投稿</Tab>
						<UpdateBtns/>
					</Title>
					
					<DynamicLoad height={"326px"} offset={100}>
						<div>
							<TabPanel>
								{getLatestActiveData().map((data, i) => (
									<SpreadCard {...data} key={i}/>
								))}
							</TabPanel>
							<TabPanel>
								{getLatestUploadData().map((data, i) => (
									<SpreadCard {...data} key={i}/>
								))}
							</TabPanel>
						</div>
					</DynamicLoad>
				</div>
			</Tabs>
		);
	}
}
