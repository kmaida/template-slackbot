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
const action_select_channel_1 = __importDefault(require("./admin/action-select-channel"));
const action_select_admins_1 = __importDefault(require("./admin/action-select-admins"));
const blocks_home_1 = __importDefault(require("./blocks-home"));
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
            event: event.type,
            msg: 'Event data from user home'
        };
        /**
         * Publish user's App Home view
         */
        try {
            const showHomeView = yield app.client.views.publish({
                token: context.botToken,
                user_id: userID,
                view: {
                    "type": "home",
                    "blocks": yield blocks_home_1.default(userID, metadata)
                }
            });
        }
        catch (err) {
            errors_1.default.slackErr(app, userID, err);
        }
    }));
    /**
     * Set up action listeners for Home View
     */
    action_select_channel_1.default(app);
    action_select_admins_1.default(app);
};
exports.default = appHomeOpened;
//# sourceMappingURL=event-app-home-opened.js.map