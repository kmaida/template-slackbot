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
const btn_open_modal_1 = __importDefault(require("./../ix/btn-open-modal"));
/*------------------
  APP HOME OPENED
------------------*/
const appHomeOpened = (app) => {
    app.event('app_home_opened', ({ event, context }) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Find the bot user ID to set in .env:
         * Uncomment the following line
         * Open the App Home, and check console logs
         */
        // console.log('Bot User ID:', context.botUserId);
        const userID = event.user;
        // Sample metadata to pass through btn-open-modal.ts -> modal.ts -> modal-view-submit.ts
        const metadata = {
            event: event,
            msg: 'Event data from user home'
        };
        // Publish this user's home view
        try {
            const showHomeView = yield app.client.views.publish({
                token: context.botToken,
                user_id: userID,
                view: {
                    "type": "home",
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `:wave: *Hello, <@${userID}>!* I'm <@${process.env.SLACK_BOT_ID}>.`
                            }
                        },
                        {
                            "type": "actions",
                            "elements": [
                                btn_open_modal_1.default(metadata)
                            ]
                        }
                    ]
                }
            });
        }
        catch (err) {
            errors_1.default.slackErr(app, userID, err);
        }
    }));
};
exports.default = appHomeOpened;
//# sourceMappingURL=app-home-opened.js.map