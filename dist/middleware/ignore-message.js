"use strict";
/*------------------
   IGNORE MESSAGE
  Middleware to
  ignore messages of
  specific subtypes
------------------*/
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
const ignoreMsg = function ({ message, next }) {
    return __awaiter(this, void 0, void 0, function* () {
        const disallowedSubtypes = ['channel_topic', 'message_changed'];
        // !message allows lack of message, such as bot events like reminders
        // @TODO: there is currently a bug where ALL app mentions return undefined as message in listener middleware
        // https://github.com/kmaida/gatsby-speakerbot/issues/7
        // There is a workaround for this in place using utils
        console.log('ignoreMsg middleware:', message);
        if (!message || (message && disallowedSubtypes.indexOf(message.subtype) > -1)) {
            yield next();
        }
    });
};
exports.default = ignoreMsg;
//# sourceMappingURL=ignore-message.js.map