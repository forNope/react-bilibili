import * as React from "react";
import * as code from "./code.gif";
import {List} from "@containers/Footer/component";
import {Item} from "./Item";

export const QRCode = () => (
	<div>
		<List>
			<Item
				text={"手机端下载"}
				href={"#"}
				backgroundPosition={"-1024px -194px"}
				code={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAABhCAIAAABJZFj0AAADKklEQVR4nO2c0W7DIAxFk6n//8vdQyU0mZpzbaimTfe8TMsIUO86gO3mfj6fl1ny9dsT+AM8Xj/u+2538VLi3MNQ6PhT1nK+JRBuyXoujYWMPq0jxjZiHuF3/RGe6X9mdoRqn/sLS/tzXdaRgm3ERF8bZH6BS89i0cm6ysbKeliMhVQ/12UdKdhGTOprVRpLD7pMw5U+gXXEHNOR8q8WtTY3wxs/ejK3jhjbiEl9rarexlkcfQp3WI0QQsMrrSPGNmKir7V3IspZ5HVFb5CNsnBSPNY0sI4Y24i5T+2+dqLU2XKGHS6C6Aexjpiyjhr/Otzm7N+YzaqxWZuvWEeMbcTcVU0O8EE7Owhuf94OPXeuPLOzvRjOf56edcTYRky6rlXl3ciL6IcVHAvnr3yQrE/riLGNmFhbo8eSM9HqTtceS1mt9mtrBtYRYxsx5dzRTsWYuNZgmY5eM7dokF33ea0D6wjrprLnaOO4r29/sklWs5VKCYp1xNhGTDyL4PZ/Bs8ioeWbScilxdmNWYxhMbTPIiexjRj2tcCOaPFGcfujHPdF91TSOdYRYxsxvIcMmmw4YwAXo52VUY8Q6EFE64hJ8yKxXf052oiWVmuxjkR1EeuIsY2YY3mR1RhywFQ/1qx7aExmcaN1xNhGjFoPuV/msug83Iux2sVYep3zeg6XzyIlbCOmX+ffSO/pR+0wRDVKPY/STv9f1pEC57Kx8DxcHzQqrDDAmt04/6ldDzljHTG2EcPfXc8etKGBsqmp5rLbRVyLoRspFuuIsY0YNd+P+h8sWlYdoXHu1+vB9GlbR4xtxMR49kAPV+vVKtXSgY+i74GtI8Y2Ys5/DxKT8Y0GehC6mgRTerCOmGPvh1RqObKxDmaosYcwqDIZ64ixjZhj74dUntnV7U/mU0dSknon1hFjGzHH3g+5UxCgd45DtGvJFl9PsI4Y24g59l6/mezcr6811UD4fAXzVNne8ifWEfNBHTVKUPYP2PthXz+zO9hGzLH3QzZ6aJQmihsoZVZibcFlHSnYRkyaF9FpR8jSOZ0o09n//sLAOmJsI+ZYXuQfYx9xthHzDclyLbJnpcixAAAAAElFTkSuQmCC"}
			/>
			<Item
				text={"新浪微博"}
				href={"#"}
				backgroundPosition={"-1024px -322px"}
				code={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAABlBMVEX///8AAABVwtN+AAABPklEQVQ4y5XTsW3DMBCF4WewYGOYCwjQGtfdShLSGiaNtIa1EjuuIYALyB0Lwi9SShdk8ndfeYc7tFLWi0WuLpGhKcH5As0LE0xHfMAmVp80d+WKmPAnTYgDLrYrnF2R9TpZmLaUdU6SH3MiP7XnKcAFe21V90rFPG4qHcnw9UQyXGjH0BTgA8quCLZlzQbEXG/g2FE+Ng/3KtqRAp5pdRv2PiQjg0Z+3yN74janZPiWwtARn2B1m8rY1jGRTQNutlQ0BbO8VU09Uda2pH4xEsdNoKPBv6hmeaqtn1JuN6RcXbQ5NAX4IFKnycaOLDApGU6FY1sC/4p2uM4sHe3NKa7+HgVoSlknLYNfkg5tHd8vclyk1k/9/nvh5lj68pH1PJeEriaLXE+0a0c4n4rmzSfk0JSyQuzgnkqgoX/0Awm1JF4V4zroAAAAAElFTkSuQmCC"}
			/>
			<Item
				text={"官方微信"}
				href={"#"}
				backgroundPosition={"-1024px -66px"}
				code={code}
				isTwoCode
			/>
		</List>
	</div>
);
