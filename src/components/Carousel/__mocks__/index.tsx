import {ICarouselProps} from "@components/Carousel/interface";
import {eachPush} from "@helps/array";
import {randomPic, randomString} from "@helps/random";

export function mockCarousel (length: number = 3): ICarouselProps {
	return {
		imgList: eachPush(length, randomPic),
		titleList: eachPush(length, () => randomString()),
		hrefList: eachPush(length, () => "#" + randomString()),
	};
}
