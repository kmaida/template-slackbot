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
exports.appMention = void 0;
const errors_1 = require("../utils/errors");
const utils_1 = require("../utils/utils");
/*------------------
    APP MENTION
------------------*/
const appMention = (app) => {
    app.event('app_mention', utils_1.ignoreMention, ({ event, context }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield app.client.chat.postMessage({
                token: context.botToken,
                channel: event.channel,
                text: `:wave: Thanks for reaching out! Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
            });
        }
        catch (err) {
            errors_1.slackErr(app, event.channel, err);
        }
    }));
};
exports.appMention = appMention;
//# sourceMappingURL=event-app-mention.js.map