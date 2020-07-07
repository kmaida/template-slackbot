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
exports.getUserInfo = void 0;
/*------------------
 SLACK PROFILE DATA
------------------*/
/**
 * Get user data from Slack API (user profile)
 * @param {string} userID user's Slack ID
 * @param {IObjectAny} app Slack App
 * @returns {Promise<ISlackUserInfo>}
 */
const getUserInfo = (userID, app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _slackUserInfo = yield app.client.users.info({
            token: process.env.SLACK_BOT_TOKEN,
            user: userID
        });
        // console.log(_slackUserInfo);
        // Pull out only desired info from Slack user profile
        const userData = {
            name: _slackUserInfo.user.profile.real_name_normalized,
            email: _slackUserInfo.user.profile.email,
            image: _slackUserInfo.user.profile.image_512
        };
        return userData;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=data-profile-slack.js.map