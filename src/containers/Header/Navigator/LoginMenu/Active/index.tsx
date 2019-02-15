import * as React from "react";
import * as styles from "./styles.scss";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {Container, Link} from "../components";
import {Tabs, Tab, TabPanel} from "@components/Tabs";
import {Video} from "./Video";
import {Live} from "./Live";
import {Column} from "./Column";

@observer
export class Active extends React.Component {
	@observable
	private moreBtnInfo = {
		hasIcon: false,
		text: "查看全部",
		href: "#",
	}
	
	@action
	private switchTab = (index: number) => {
		switch (index) {
			case 0:
				this.moreBtnInfo.text = "查看全部";
				break;
			case 1:
				this.moreBtnInfo.text = "所有关注";
				break;
			case 2:
				this.moreBtnInfo.text = "进入专栏区";
				break;
		}
	}
	
	public render () {
		return (
			<Tabs selectedCb={this.switchTab}>
				<Container
					width={"380px"}
					height={"410px"}
					more={this.moreBtnInfo}
					className={styles.container}
				>
					<div className={styles.tabs}>
						<Tab>视频</Tab>
						<Tab>直播</Tab>
						<Tab>专栏</Tab>
					</div>
					
					<TabPanel>
						<Video/>
					</TabPanel>
					
					<TabPanel>
						<Live/>
					</TabPanel>
					
					<TabPanel>
						<Column/>
					</TabPanel>
				</Container>
			</Tabs>
		);
	}
}
