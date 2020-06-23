"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return !!cleanStr.match(regex);
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
    },
    /**
     * Message middleware: ignore some kinds of messages
     * @param {IObjectAny} event event object
     * @return {Promise<void>} continue if not ignored message type
     */
    ignoreMention({ event, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            const disallowedSubtypes = ['channel_topic', 'message_changed'];
            const ignoreSubtype = disallowedSubtypes.indexOf(event.subtype) > -1;
            const messageChanged = !!event.edited;
            // If not ignored subtype and not an edited message event, proceed
            if (!ignoreSubtype && !messageChanged) {
                yield next();
            }
        });
    }
};
exports.default = utils;
//# sourceMappingURL=utils.js.map