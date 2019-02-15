import * as React from "react";
import * as styles from "./styles.scss";
import {DynamicLoad} from "@components/Lazyload";
import {IBangumiCardProps} from "@homeComponents/Card/Bangumi";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {BangumiCard} from "@homeComponents/Card";
import {
	Title,
	Name,
	Icon,
} from "@homeComponents/Shelves/components";
import {Tabs, Tab, TabPanel} from "@components/Tabs";

type IDate = "latest"
	| "monday" | "tuesday"
	| "wednesday" | "thursday"
	| "friday" | "saturday"
	| "sunday";

export interface IMainProps {
	backgroundImage?: string;
	backgroundPosition: string;
	name?: string;
	nameHref?: string;
	scheduleHref?: string;
	
	getData (type: IDate): Array<IBangumiCardProps>;
	
	rows: number;
}

@observer
export class Main extends React.Component<IMainProps> {
	@observable
	private index = 0;
	
	private contentStyle: React.CSSProperties = {
		height: this.props.rows * 100 + "px",
		overflow: "auto",
	};
	
	private static tabTextArr = ["最新", "一", "二", "三", "四", "五", "六", "日"];
	private static tabSelectTextArr = ["最新", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
	
	@action
	private switchTab = (index: number) => {
		this.index = index;
	}
	
	public render () {
		const {
			      name,
			      nameHref,
			      backgroundPosition,
			      scheduleHref,
			      getData,
		      } = this.props;
		
		return (
			<Tabs selectedCb={this.switchTab}>
				<div>
					<Title>
						<Icon backgroundPosition={backgroundPosition}/>
						<Name text={name} href={nameHref}/>
						{Main.tabTextArr.map((text, i) => (
							<Tab className={styles.tab} key={i}>
								{this.index === i
									? Main.tabSelectTextArr[i]
									: text}
							</Tab>
						))}
						<a
							className={styles.shedule}
							href={scheduleHref}
						>
							新番时间表
						</a>
					</Title>
					<DynamicLoad height={this.contentStyle.height}>
						<div style={this.contentStyle}>
							{new Array(8)
								.fill(null)
								.map((_, i) => {
									let date: IDate;
									switch (i) {
										case 0:
											date = "latest";
											break;
										case 1:
											date = "monday";
											break;
										case 2:
											date = "tuesday";
											break;
										case 3:
											date = "wednesday";
											break;
										case 4:
											date = "thursday";
											break;
										case 5:
											date = "friday";
											break;
										case 6:
											date = "saturday";
											break;
										case 7:
											date = "sunday";
											break;
									}
									return (
										<TabPanel key={date}>
											{getData(date)
												.map((data: IBangumiCardProps, i: number) => (
													<BangumiCard {...data} key={i}/>
												))}
										</TabPanel>
									);
								})}
						</div>
					</DynamicLoad>
				</div>
			</Tabs>
		);
	}
}
