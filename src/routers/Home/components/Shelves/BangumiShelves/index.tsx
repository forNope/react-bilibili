import * as React from "react";
import * as styles from "./styles.scss";
import {Shelves} from "@homeComponents/Shelves/components";
import {Main, IMainProps} from "./Main";
import {Section, ISectionProps} from "./Section";

export const BangumiShelves: React.SFC<IMainProps & ISectionProps> = ({
	                                                                      backgroundImage,
	                                                                      backgroundPosition,
	                                                                      name,
	                                                                      nameHref = "javascript: void(0)",
	                                                                      scheduleHref = "javascript: void(0)",
	                                                                      rows = 4,
	                                                                      getData,
	                                                                      getRankData,
                                                                      }) => {
	const mainProps    = {
		      backgroundImage,
		      backgroundPosition,
		      name,
		      nameHref,
		      scheduleHref,
		      getData,
		      rows,
	      },
	      sectionProps = {
		      getRankData,
	      };
	
	return (
		<Shelves height={"100%"} autoLayout={false}>
			<Main {...mainProps}/>
			<Section {...sectionProps}/>
		</Shelves>
	);
};
