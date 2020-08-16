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
exports.dmConfirmSave = void 0;
const errors_1 = require("../utils/errors");
/*------------------
  DM CONFIRM SAVE
------------------*/
const dmConfirmSave = (app, atData) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = atData.slackID;
    try {
        const sendMsg = yield app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: userID,
            text: `:tada: Your data has been saved successfully:\n*Name:* ${atData.name}\n*Email:* ${atData.email}\n*Image:* ${atData.image}\n*URL:* ${atData.url}\n*Bio:* ${atData.bio}\n<${atData.link}|View in Airtable>`,
            unfurl_links: false
        });
    }
    catch (err) {
        errors_1.slackErr(app, userID, err);
    }
});
exports.dmConfirmSave = dmConfirmSave;
//# sourceMappingURL=dm-confirm-save-profile.js.map