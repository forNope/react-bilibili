import {createKey, uuid} from "@helps/crypto";
import {forEach} from "@helps/object";
import {isObject, isString} from "@helps/types";

const cache: anyObj<anyObj> = {},
      expando               = "Phantom-" + createKey();

/**
 * e.g.:
 *  const el = document.querySelector("#example");
 *
 *  data(el) // return: {}
 *  data(el, "myData") // return: undefined
 *
 *  data(el, "myData", "setting data") // return: el
 *  data(el) // return: {myData: "setting data"}
 *  data(el, "myData") // return: "setting data"
 *
 *  data(el, {wow: "forObjWow", oh: "forObjOh"}) // return: el
 *  data(el)
 *  // return: {
 *    myData: "setting data",
 *    wow: "forObjWow",
 *    oh: "forObjOh",
 *  }
 *  data(el, "wow") // return: "forObjWow"
 *
 * @param {HTMLElement} el
 * @param {string | {[key: string]: any}} name
 * @param {any} data
 * @returns {el | data} return data when you get data, otherwise return el
 */

export function data (el: HTMLElement & any,
                      name?: string | { [key: string]: any },
                      data?: any) {
	const id = el[expando]
		? el[expando]
		: el[expando] = uuid();
	
	const elCache = cache[id]
		? cache[id]
		: cache[id] = {};
	
	const argLength = arguments.length;
	
	if (argLength === 1) {
		return elCache;
	} else if (argLength === 2) {
		if (isString(name)) {
			return elCache[name as string];
		} else if (isObject(name)) {
			forEach(name, (key, value) => {
				elCache[key] = value;
			});
		}
	} else if (argLength === 3) {
		elCache[name as string] = data;
	}
	
	return el;
}

export function removeData (el: HTMLElement & any, name?: string) {
	const id = el[expando];
	
	if (id) {
		if (!name) {
			delete el[expando];
			delete cache[id];
		} else {
			delete cache[id][name];
		}
	}
}
