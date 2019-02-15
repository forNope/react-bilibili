import * as React from "react";
import * as styles from "./styles.scss";
import * as photoIcon from "./assets/livePhotos.png";
import * as videoIcon from "./assets/liveVideo.png";
import {mockCarousel} from "@components/Carousel/__mocks__";
import {ILiveRankProps} from "@homeComponents/Rank/interface";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {LiveRankItem} from "@homeComponents/Rank";
import {Title} from "@homeComponents/Shelves/components";
import {StretchCarousel} from "@components/Carousel";
import {Tabs, Tab, TabPanel} from "@components/Tabs";

export interface ISectionProps {
	getRankData (): Array<ILiveRankProps>;
	
	getAttentionData (): Array<ILiveRankProps>;
}

@observer
export class Section extends React.Component<ISectionProps> {
	public render () {
		const {getRankData, getAttentionData} = this.props;
		return (
			
			<Tabs>
				<div>
					<Title>
						<Tab>直播排行</Tab>
						<Tab>关注的主播</Tab>
						<Tab>为你推荐</Tab>
					</Title>
					<div>
						<TabPanel>
							{getRankData().map((data, i) => (
								<LiveRankItem {...data} key={i}/>
							))}
						</TabPanel>
						<TabPanel>
							{getAttentionData().map((data, i) => (
								<LiveRankItem {...data} key={i}/>
							))}
						</TabPanel>
						<TabPanel>
							<div className={styles["carousel-container"]}>
								<StretchCarousel {...mockCarousel(3)} width={"100%"} height={"240px"}/>
							</div>
							
							<div className={styles.anchor}>
								<a href="#">
									<img src={photoIcon} alt="photos"/>
								</a>
								
								<a className={styles.video} href="#">
									<img src={videoIcon} alt="photos"/>
								</a>
							</div>
						</TabPanel>
					</div>
				</div>
			</Tabs>
		);
	}
}
