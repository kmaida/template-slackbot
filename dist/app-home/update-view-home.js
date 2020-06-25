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
const blocks_home_1 = __importDefault(require("./blocks-home"));
const errors_1 = require("./../utils/errors");
/*------------------
BLOCKS: UPDATE HOME VIEW
------------------*/
/**
 * Update the app home view (when data in it has changed)
 * @param {IObjectAny} app Slack App
 * @param {string} userID Slack ID of user whose home view is being updated
 * @param {string} viewID view ID of user whose home view is being updated
 * @param {any} metadata metadata passing from home view to modal button
 */
const updateHomeView = (app, userID, viewID, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateHomeView = yield app.client.views.update({
            token: process.env.SLACK_BOT_TOKEN,
            user_id: userID,
            view_id: viewID,
            view: {
                "type": "home",
                "blocks": yield blocks_home_1.default(userID, metadata)
            }
        });
        console.log('TRIGGER HOME VIEW UPDATE: app home view updated for viewID', viewID);
    }
    catch (err) {
        errors_1.slackErr(app, userID, err);
    }
});
module.exports = updateHomeView;
//# sourceMappingURL=update-view-home.js.map