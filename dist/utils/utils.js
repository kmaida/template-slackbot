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
exports.ignoreMention = exports.clearNewline = exports.objNotEmpty = exports.validUrl = void 0;
/*------------------
       UTILS
------------------*/
/**
 * Is the string a valid URL?
 * @param {string} input
 * @return {boolean}
 */
const validUrl = (input) => {
    const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
    const regex = new RegExp(regexRaw);
    const cleanStr = input.toString().trim();
    return !!cleanStr.match(regex);
};
exports.validUrl = validUrl;
/**
 * Does an object have properties?
 * @param {IObjectAny} obj object to test if empty
 * @return {boolean} is the object empty or not?
 */
const objNotEmpty = (obj) => {
    return obj && Object.keys(obj).length && obj.constructor === Object;
};
exports.objNotEmpty = objNotEmpty;
/**
 * Clear newlines or set newline values to undefined instead
 * @param {string} input to return undefined if only newline
 * @return {string} return same input or undefined if only newline
 */
const clearNewline = (input) => {
    if (input === '\n') {
        return undefined;
    }
    else {
        return input;
    }
};
exports.clearNewline = clearNewline;
/**
 * Message middleware: ignore some kinds of messages
 * Ignore channel topic and edited message events
 * (e.g., link unfurling is an edit / message_changed subtype)
 * This has catches for inconsistencies in Slack API
 * @param {IObjectAny} event event object
 * @return {Promise<void>} continue if not ignored message type
 */
const ignoreMention = ({ message, event, next }) => __awaiter(void 0, void 0, void 0, function* () {
    const disallowedSubtypes = ['channel_topic', 'message_changed'];
    const ignoreSubtypeEvent = disallowedSubtypes.indexOf(event.subtype) > -1;
    const ignoreSubtypeMessage = message && message.subtype && disallowedSubtypes.indexOf(message.subtype) > -1;
    const ignoreEdited = !!event.edited;
    // If mention should be ignored, return
    if (ignoreSubtypeEvent || ignoreSubtypeMessage || ignoreEdited) {
        return;
    }
    // If mention should be processed, continue
    yield next();
});
exports.ignoreMention = ignoreMention;
//# sourceMappingURL=utils.js.map