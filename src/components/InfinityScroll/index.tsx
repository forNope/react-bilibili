import {firstUpperCase} from "@helps/string";
import {isArray, isFunction, isNumber, isPromise} from "@helps/types";
import * as React from "react";
import Loading from "@components/Loading";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

type loadingState =
	"idle" | "loading"
	| "complete" | "allComplete"
	| "error" | "retry"
	| "errorFrequently";

type cbType = (resolve: (value: any) => void,
               reject: (reason: any) => void) => void;

type dataType = ReactElement
	| Array<ReactElement>
	| Promise<any>
	| cbType;

interface IInfinityScrollProps {
	getData (): dataType;
	
	// request data at the bottom of the distance
	offset?: number;
	
	// unit: ms, default infinity if not set
	// if not set complete, it will show until start request data
	// if not set allComplete, it will has been show
	// if not set error, it will show until start retry
	showComponentTime?: {
		complete?: number;
		allComplete?: number;
		error?: number;
	};
	
	// max retry frequency
	maxErrorNum?: number;
	
	// max request data frequency
	maxRequestDataNum?: number;
	
	// auto retry while request data error
	autoRetry?: number;
	
	// render it each time while data is loaded
	renderLoadingComplete?: ReactElement;
	
	// render it while request data happened error
	renderLoadingError?: ReactElement;
	
	// render it while happened error frequency equal maxErrorNum
	renderLoadingErrorFrequently?: ReactElement;
	
	// render it while loading data frequency equal limit num
	renderLoadingAllComplete?: ReactElement;
	
	// render it while happened error and retry request data
	renderRetry?: ReactElement;
	
	// render it while request data
	renderLoading?: ReactElement;
	
	// btn will auto attach onclick event
	// if btn have own onclick event, it will merge it
	
	// render it while loading state is idle or complete
	renderRequestBtn?: ReactElement;
	// render it while loading state is error or errorFrequently
	renderRetryBtn?: ReactElement;
	
	onLoading?: Function;
	onLoadingComplete?: Function;
	onLoadingAllComplete?: Function;
	onError?: Function;
	onRetry?: Function;
	onErrorFrequently?: Function;
}

@observer
export class InfinityScroll extends React.Component<IInfinityScrollProps> {
	public static defaultProps: IInfinityScrollProps = {
		getData: () => null,
		offset: 0,
		renderLoading: <Loading/>,
		showComponentTime: {},
	};
	
	private loadedNum = 0;
	private errorNum = 0;
	private canRequest = true;
	
	private emit = () => {
		const type = "on" + firstUpperCase(this.getLoadingState());
		
		if ((this.props as any)[type]) {
			(this.props as any)[type]();
		}
	}
	
	@observable
	private loadingState: loadingState = "idle";
	
	@observable
	private appendDataCache: any[] = [];
	
	@action
	private setLoadingState = (state: loadingState) => {
		window.clearTimeout(this.timer);
		this.loadingState = state;
		this.handleState();
		this.emit();
	}
	
	private getLoadingState = () => this.loadingState;
	
	private timer: number;
	
	public retry = (time: number = 0) => {
		if (isNumber(time)
			&& this.errorNum !== this.props.maxErrorNum) {
			this.timer = window.setTimeout(
				() => {
					this.setLoadingState("retry");
				},
				time,
			);
		}
	}
	
	public requestData = () => {
		if (this.canRequest) {
			this.setLoadingState("loading");
			this.appendData(this.props.getData());
		}
	}
	
	public cancelRetry = () => {
		this.setLoadingState("error");
	}
	
	public getDataLength = () => this.appendDataCache.length;
	
	public hasData = () => !!this.appendDataCache.length;
	
	private handleState = () => {
		const {autoRetry, showComponentTime} = this.props,
		      {complete, allComplete, error} = showComponentTime,
		      state                          = this.getLoadingState();
		
		this.canRequest =
			state === "idle"
			|| state === "complete"
			|| state === "retry";
		
		switch (state) {
			case "retry":
				this.requestData();
				break;
			case "error":
				if (++this.errorNum === this.props.maxErrorNum) {
					this.setLoadingState("errorFrequently");
				} else if (autoRetry) {
					this.retry(autoRetry);
				}
				break;
			case "idle":
				break;
			case "complete":
				if (++this.loadedNum === this.props.maxRequestDataNum) {
					this.setLoadingState("allComplete");
				} else {
					if (isNumber(complete)) {
						this.timer = window.setTimeout(
							() => {
								this.setLoadingState("idle");
							},
							complete,
						);
					}
				}
				break;
		}
	}
	
	@action
	private appendData = (data: dataType) => {
		const {maxRequestDataNum, maxErrorNum} = this.props;
		
		if (data) {
			if (isArray(data)) {
				this.appendDataCache = this.appendDataCache.concat(data);
				this.setLoadingState("complete");
			} else if (isFunction(data)) {
				(data as Function)(this.appendData, () => {
					this.setLoadingState("error");
				});
			} else if (isPromise(data)) {
				(data as Promise<any>)
					.then((value: any) => {
						this.appendData(value);
					})
					.catch((reason) => {
						this.setLoadingState("error");
					});
			} else {
				this.appendDataCache.push(data);
				this.setLoadingState("complete");
			}
		} else {
			this.setLoadingState("error");
		}
	}
	
	private handleScroll = (e: React.UIEvent<HTMLElement>) => {
		const target = e.currentTarget,
		      offset = this.props.offset;
		
		if (target.scrollTop >= target.scrollHeight - target.clientHeight - offset) {
			this.requestData();
		}
	}
	
	public render () {
		const {
			      children,
			      renderLoading,
			      renderLoadingComplete,
			      renderLoadingAllComplete,
			      renderLoadingError,
			      renderRetry,
			      renderLoadingErrorFrequently,
		      } = this.props;
		
		let stateComponent = null;
		
		switch (this.loadingState) {
			case "loading":
				stateComponent = renderLoading;
				break;
			case "complete":
				stateComponent = renderLoadingComplete;
				break;
			case "allComplete":
				stateComponent = renderLoadingAllComplete;
				break;
			case "error":
				stateComponent = renderLoadingError;
				break;
			case "retry":
				stateComponent = renderRetry;
				break;
			case "errorFrequently":
				stateComponent = renderLoadingErrorFrequently;
		}
		
		return (
			<div onScroll={this.handleScroll}>
				{children}
				{this.appendDataCache}
				{stateComponent}
			</div>
		);
	}
}
