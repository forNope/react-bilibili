import * as React from "react";
import * as styles from "./styles.scss";
import {Shelves} from "@homeComponents/Shelves/components";
import {Main, IMainProps} from "./Main";
import {Section, ISectionProps} from "./Section";

export const LiveShelves: React.SFC<IMainProps & ISectionProps> = ({
	                                                                   liveNum,
	                                                                   getData,
	                                                                   getRankData,
	                                                                   getAttentionData,
                                                                   }) => {
	const mainProps    = {
		      liveNum,
		      getData,
	      },
	      sectionProps = {
		      getRankData,
		      getAttentionData,
	      };
	
	return (
		<Shelves height={"381px"}>
			<Main {...mainProps}/>
			<Section {...sectionProps}/>
		</Shelves>
	);
};
