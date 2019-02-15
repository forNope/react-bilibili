import * as React from "react";
import * as styles from "./styles.scss";
import {Shelves} from "@homeComponents/Shelves/components";
import {Main, IMainProps} from "./Main";
import {Section, ISectionProps} from "./Section";

export const PartShelves: React.SFC<IMainProps & ISectionProps> = ({
	                                                                   backgroundPosition,
	                                                                   name,
	                                                                   nameHref,
	                                                                   getLatestActiveData,
	                                                                   getLatestUploadData,
	                                                                   site,
	                                                                   original,
                                                                   }) => {
	
	const mainProps    = {
		      backgroundPosition,
		      name,
		      nameHref,
		      getLatestActiveData,
		      getLatestUploadData,
	      },
	      sectionProps = {
		      site,
		      original,
	      };
	
	return (
		<Shelves height={"381px"}>
			<Main {...mainProps}/>
			<Section {...sectionProps}/>
		</Shelves>
	);
};
