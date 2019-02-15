import {eachPush} from "@helps/array";
import * as React from "react";
import * as styles from "./styles.scss";
import {observable} from "mobx";
import {observer, inject} from "mobx-react";

@observer
export class SwitchOpt extends React.Component<{ textArr: string[], switchOptCb?(index: number): void; }> {
	@observable private textArr: string[] = this.props.textArr;
	// stores the corresponding index values
	private indexOrderArr: number[] = this.textArr.map((_, i: number) => i);
	
	private switchOpt = (e: React.MouseEvent<HTMLElement>) => {
		const textArr       = this.textArr,
		      indexOrderArr = this.indexOrderArr,
		      target        = e.currentTarget as HTMLElement,
		      index         = +target.dataset.index,
		      arrIndex      = indexOrderArr.indexOf(index);
		
		if (arrIndex) {
			[textArr[arrIndex], textArr[0]] = [textArr[0], textArr[arrIndex]];
			[indexOrderArr[arrIndex], indexOrderArr[0]] = [indexOrderArr[0], indexOrderArr[arrIndex]];
			
			this.props.switchOptCb(index);
		}
	}
	
	public render () {
		return (
			<>
				<div className={styles["flex-full"]}/>
				<div className={styles.wrapper}>
					<ul className={styles["switch-date"]}>
						{this.textArr.map((text: string, i: number) => (
							<li
								className={i > 0 ? styles.item : null}
								onClick={this.switchOpt}
								key={text}
								data-index={this.indexOrderArr[i]}
							>
								<span className={styles.text}>
									{text}
								</span>
							</li>
						))}
					</ul>
					
					<i className={styles.icon}/>
				</div>
			</>
		);
	}
}
