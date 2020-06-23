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
const errors_1 = __importDefault(require("./../utils/errors"));
const utils_1 = __importDefault(require("./../utils/utils"));
/*------------------
    APP MENTION
------------------*/
const appMention = (app) => {
    app.event('app_mention', utils_1.default.ignoreMention, ({ event, context }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield app.client.chat.postMessage({
                token: context.botToken,
                channel: event.channel,
                text: `:wave: Thanks for reaching out! Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
            });
        }
        catch (err) {
            errors_1.default.slackErr(app, event.channel, err);
        }
    }));
};
exports.default = appMention;
//# sourceMappingURL=app-mention.js.map