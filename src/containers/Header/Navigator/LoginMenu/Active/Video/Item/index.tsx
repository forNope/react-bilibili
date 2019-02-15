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
	cover: string;
	name: string;
	spaceLink: string;
	videoLink: string;
	title: string;
	state: string;
}

export const Item: React.SFC<IItemProps> = ({
	                                            cover,
	                                            name,
	                                            spaceLink,
	                                            videoLink,
	                                            title,
	                                            state,
                                            }) => (
	<Container>
		<a href={videoLink}>
			<Cover src={cover}/>
		</a>
		
		<InfoContainer>
			<Name href={spaceLink} text={name}/>
			<State text={"投稿了"}/>
			<br/>
			<Desc text={title} href={videoLink}/>
		</InfoContainer>
	</Container>
);
