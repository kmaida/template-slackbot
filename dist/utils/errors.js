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
exports.slackErr = exports.storeErr = void 0;
/*------------------
      ERRORS
------------------*/
/**
 * Simple log and return error
 * @param {IObjectAny|string} err object or error message
 * @return {IObjectAny} error object
 */
const storeErr = (err) => {
    const msg = err.msg || err;
    console.error('STORE ERROR:', msg);
    return new Error(msg);
};
exports.storeErr = storeErr;
/**
 * Send error to Slack in specified channel
 * @param {IObjectAny} app Slack app
 * @param {string} channel to publish message in
 * @param {string} err message
 */
const slackErr = (app, channel, err) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = err.message || err;
    console.error('ERROR:', msg);
    try {
        const sendErr = yield app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: channel,
            text: ":x: I'm sorry, I couldn't do that because an error occurred: ```" + JSON.stringify(msg) + "```"
        });
    }
    catch (err) {
        console.error('ERROR DELIVERING SLACK MESSAGE ERROR:', err);
    }
});
exports.slackErr = slackErr;
//# sourceMappingURL=errors.js.map