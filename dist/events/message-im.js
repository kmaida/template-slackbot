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
       BOT DM
------------------*/
const botDM = (app) => {
    app.event('message', ({ event, context }) => __awaiter(void 0, void 0, void 0, function* () {
        // Ignore message edited events
        // (Slack bug causing listener middleware not to work)
        // (This is an alternative solution)
        if (utils_1.default.ignoreMention(event))
            return;
        try {
            const sendMsg = yield app.client.chat.postMessage({
                token: context.botToken,
                channel: event.channel,
                text: `:shrug: I'm sorry, I didn't understand that. Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|Home tab>*.`
            });
        }
        catch (err) {
            errors_1.default.slackErr(app, event.channel, err);
        }
    }));
};
exports.default = botDM;
//# sourceMappingURL=message-im.js.map