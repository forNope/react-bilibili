import {isSsr} from "@helps/support";

export const isMS = !isSsr ? navigator.userAgent.includes("Trident") : false;
