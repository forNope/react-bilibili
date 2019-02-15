import * as React from "react";
import * as styles from "./styles.scss";
import {Shelves} from "@homeComponents/Shelves/components";
import {Main, IMainProps} from "./Main";
import {Section, ISectionProps} from "./Section";

export const PromotionShelves: React.SFC<IMainProps & ISectionProps> = ({
	                                                                        getData,
	                                                                        onlineNum,
	                                                                        latestUploadNum,
	                                                                        pic,
	                                                                        picHref,
                                                                        }) => {
	const mainProps    = {
		      getData,
	      },
	      sectionProps = {
		      onlineNum,
		      latestUploadNum,
		      pic,
		      picHref,
	      };
	
	return (
		<Shelves height={"220px"}>
			<Main {...mainProps}/>
			<Section {...sectionProps}/>
		</Shelves>
	);
}
