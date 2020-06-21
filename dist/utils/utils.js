"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------
       UTILS
------------------*/
const utils = {
    /**
     * Is the string a valid URL?
     * @param {string} input
     * @return {boolean}
     */
    validUrl(input) {
        const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
        const regex = new RegExp(regexRaw);
        const cleanStr = input.toString().trim();
        return cleanStr.match(regex);
    },
    /**
     * Does an object have properties?
     * @param {IObjectAny} obj object to test if empty
     * @return {boolean} is the object empty or not?
     */
    objNotEmpty(obj) {
        return obj && Object.keys(obj).length && obj.constructor === Object;
    },
    /**
     * Clear newlines or set newline values to undefined instead
     * @param {string} input to return undefined if only newline
     * @return {string} return same input or undefined if only newline
     */
    clearNewline(input) {
        if (input === '\n') {
            return undefined;
        }
        else {
            return input;
        }
    }
};
exports.default = utils;
//# sourceMappingURL=utils.js.map