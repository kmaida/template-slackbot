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
exports.getUserData = void 0;
/*------------------
     SLACK DATA
------------------*/
/**
 * Get user data from Slack API (user profile)
 * @param {string} userID user's Slack ID
 * @param {IObjectAny} app Slack App
 * @returns {Promise<ISlackUserData}
 */
const getUserData = (userID, app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _userInfo = yield app.client.users.info({
            token: process.env.SLACK_BOT_TOKEN,
            user: userID
        });
        console.log(_userInfo);
        const userData = {
            name: _userInfo.user.profile.real_name_normalized,
            email: _userInfo.user.profile.email
        };
        return userData;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getUserData = getUserData;
//# sourceMappingURL=data-slack.js.map