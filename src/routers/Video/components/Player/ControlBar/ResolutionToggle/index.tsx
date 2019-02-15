import * as React from "react";
import * as styles from "./styles.scss";
import * as commonStyles from "../commonStyles.scss";
import {IControlBarProps} from "../";
import {observable, action} from "mobx";
import {observer, inject} from "mobx-react";

export interface IResolutionToggleProps extends IControlBarProps {
	optionalResolutionArr: string[];
	defaultResolution: string;
}

@inject("player") @observer
export class ResolutionToggle extends React.Component<IResolutionToggleProps> {
	@observable
	private currentResolution = this.props.defaultResolution;
	
	@action
	private setResolution = (resolution: string) => {
		this.currentResolution = resolution;
	}
	
	private handleClick = (e: React.MouseEvent<HTMLElement>) => this.setResolution(e.currentTarget.textContent);
	
	public render () {
		return (
			<div className={`${styles.resolution} ${commonStyles.container}`}>
				{this.currentResolution}
				<ul className={`${styles.list} ${commonStyles.append} ${commonStyles.detail}`}>
					{this.props.optionalResolutionArr.map((resolution, i) => (
						<li
							className={styles.item}
							onClick={this.handleClick}
							key={i}
						>
							{resolution}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
