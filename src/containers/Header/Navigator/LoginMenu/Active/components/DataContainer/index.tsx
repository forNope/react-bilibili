import {EmptyData} from "@containers/Header/Navigator/LoginMenu/Active/components";
import {isEmpty} from "@helps/array";
import * as React from "react";
import {InfinityScroll} from "@components/InfinityScroll";
import {Split} from "../";

interface IDataContainerProps {
	renderNew?: Array<ReactElement>;
	renderHistory?: Array<ReactElement>;
	
	getDataFn (): any;
}

export class DataContainer extends React.Component<IDataContainerProps> {
	private infinityScroll: InfinityScroll;
	
	public render () {
		const {
			      renderNew,
			      renderHistory,
			      getDataFn,
		      } = this.props;
		
		return (
			<InfinityScroll
				ref={(com) => this.infinityScroll = com}
				getData={getDataFn}
				maxErrorNum={3}
				maxRequestDataNum={3}
				renderLoading={<Split>加载中</Split>}
				renderLoadingComplete={<Split>加载完毕</Split>}
				renderLoadingAllComplete={<Split>{String("(´・ω・｀) 点击下方按钮查看全部动态")}</Split>}
				renderLoadingError={(<Split>Error: 请求数据失败</Split>)}
				renderLoadingErrorFrequently={<Split>请检查您的网络是否正常</Split>}
				renderRetry={<Split>重试中</Split>}
				autoRetry={2000}
			>
				{renderNew && !isEmpty(renderNew)
					? renderNew
					: <EmptyData>暂时没有新动态哦</EmptyData>}
				
				<Split>历史动态</Split>
				
				{renderHistory && !isEmpty(renderHistory)
					? renderHistory
					: <EmptyData>暂时没有历史动态哦</EmptyData>}
			</InfinityScroll>
		);
	}
}

//
// export const DataContainer: React.SFC<IDataContainerProps> = ({
// 	                                                              renderNew,
// 	                                                              renderHistory,
// 	                                                              getDataFn,
//                                                               }) => (
// 	<InfinityScroll
// 		getData={getDataFn}
// 		maxErrorNum={3}
// 		maxRequestDataNum={3}
// 		renderLoading={<Split>加载中</Split>}
// 		renderLoadingComplete={<Split>加载完毕</Split>}
// 		renderLoadingAllComplete={<Split>{String("(´・ω・｀) 点击下方按钮查看全部动态")}</Split>}
// 		renderLoadingError={(<Split>Error: 请求数据失败</Split>)}
// 		renderLoadingErrorFrequently={<Split>请检查您的网络是否正常</Split>}
// 		renderRetry={<Split>重试中</Split>}
// 		autoRetry={2000}
// 	>
// 		{renderNew && !isEmpty(renderNew)
// 			? renderNew
// 			: <EmptyData>暂时没有新动态哦</EmptyData>}
//
// 		<Split>历史动态</Split>
//
// 		{renderHistory && !isEmpty(renderHistory)
// 			? renderHistory
// 			: <EmptyData>暂时没有历史动态哦</EmptyData>}
// 	</InfinityScroll>
// );
