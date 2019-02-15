import * as React from "react";
import * as commonStyles from "../../commonStyles.scss";
import {
	Container,
	Avatar,
	Name,
	State,
	Desc,
	InfoContainer,
} from "../../components";

interface IItemProps {
	avatar: string;
	name: string;
	liveState: string;
	signature: string;
	liveLink: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            avatar,
	                                            name,
	                                            liveState,
	                                            signature,
	                                            liveLink,
                                            }) => (
	<Container height={"70px"}>
		<a href={liveLink}>
			<Avatar src={avatar}/>
		</a>
		
		<InfoContainer href={liveLink}>
			<Name text={name}/>
			<State text={liveState} isActive/>
			<br/>
			<Desc text={signature}/>
		</InfoContainer>
	</Container>
);
