import * as React from "react";

export const TabPanel: React.SFC = ({children}) => (
	<>
		{children}
	</>
);

(TabPanel as any).role = "tab-panel";
