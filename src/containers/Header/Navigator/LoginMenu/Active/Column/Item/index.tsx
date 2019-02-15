import * as React from "react";
import {
	Container,
	Cover,
	InfoContainer,
	Name,
	State,
	Desc,
} from "../../components";

interface IItemProps {
	name: string;
	cover: string;
	state: string;
	title: string;
	columnLink: string;
	spaceLink: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            name,
	                                            cover,
	                                            state,
	                                            title,
	                                            columnLink,
	                                            spaceLink,
                                            }) => (
	<Container>
		<InfoContainer>
			<Name text={name} href={spaceLink}/>
			<State text={state}/>
			<br/>
			<Desc text={title} href={columnLink}/>
		</InfoContainer>
		
		<a href={columnLink}>
			<Cover src={cover}/>
		</a>
	</Container>
);
