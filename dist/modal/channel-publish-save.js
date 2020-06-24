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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../utils/errors"));
/*------------------
CHANNEL PUBLISH SAVE
------------------*/
const channelPublishSave = (app, atData) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = process.env.SLACK_CHANNEL_ID;
    try {
        const sendMsg = yield app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: channel,
            text: `:tada: \`<@${atData.slackID}>\` has added:\n*Name:* ${atData.name}\n*URL:* ${atData.url}\n*Notes:* ${atData.notes}\n<${atData.link}|View in Airtable>`,
            unfurl_links: false
        });
    }
    catch (err) {
        errors_1.default.slackErr(app, channel, err);
    }
});
exports.default = channelPublishSave;
//# sourceMappingURL=channel-publish-save.js.map