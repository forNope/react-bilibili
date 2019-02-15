import * as React from "react";

export function getProps (ReactEl: React.ReactElement<any>) {
	return ReactEl.props;
}
