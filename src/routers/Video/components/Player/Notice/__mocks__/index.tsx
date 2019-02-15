import { INoticeProps } from "../";
import { eachPush } from "@helps/array";
import { randomString } from "@helps/random";

export function mockNotice(): INoticeProps {
	return {
		matters: eachPush(4, () => ({
			text: randomString("bilibili周刊第1233期|周刊BILIBILI测试期刊"),
			href: "#" + randomString("notice1|notice2"),
		})),
	};
}
