import {isSsr} from "@helps/support";

export const isWebKit = !isSsr ? navigator.userAgent.includes("AppleWebKit") : false;
