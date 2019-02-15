import {randomNumber} from "../";
import * as pic1 from "./assets/1.jpg";
import * as pic2 from "./assets/2.jpg";
import * as pic3 from "./assets/3.jpg";
import * as pic4 from "./assets/4.jpg";
import * as pic5 from "./assets/5.jpg";
import * as pic6 from "./assets/6.jpg";
import * as pic7 from "./assets/7.jpg";
import * as pic8 from "./assets/8.jpg";
import * as pic9 from "./assets/9.jpg";
import * as pic10 from "./assets/10.jpg";

export function randomPic (): string {
	const picArr: string[] = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];
	return picArr[randomNumber(10) - 1];
}
