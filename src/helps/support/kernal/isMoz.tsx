import {isSsr} from "@helps/support";

export const isMoz = !isSsr ? navigator.userAgent.includes("Firefox") : false;
