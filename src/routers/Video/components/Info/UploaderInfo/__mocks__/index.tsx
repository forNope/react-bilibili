import { IUploaderProps } from "../";
import { randomString, randomNumber, randomPic } from "@helps/random";

export function mockUploaderInfo(): IUploaderProps {
	return {
		name: randomString("phantom|weState|mini or max"),
		spaceHref: "javascript: void(0)",
		avatarPic: randomPic(),
		signature: randomString(),
		num: {
			upload: randomNumber(100),
			fans: randomNumber(50000),
		},
		liveInfo: {
			state: randomNumber(2) === 1 ? "rolling" : "live",
			href: "javascript: void(0)",
		},
	};
}
