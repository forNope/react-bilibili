import {enterFullScreen} from "@helps/DOM";
import {isFunction} from "@helps/types";

export const isSupportFullScreen = isFunction(enterFullScreen);
