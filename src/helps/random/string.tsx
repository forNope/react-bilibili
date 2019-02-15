import {randomNumber} from "./";

const longText  = "长文字测试测试长文字测试测试长文字测试测试长文字测试测试长文字测试测试长文字测试测试长文字测试测试",
      shortText = "{MMD} Loading...";

export function randomString (template?: string): string {
	if (template) {
		const stringArr: string[] = template.split("|");
		return stringArr[randomNumber(stringArr.length) - 1];
	} else {
		return randomNumber(2) === 1 ? longText : shortText;
	}
}
