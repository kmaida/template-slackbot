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
exports.updateAllHomes = exports.updateHomeView = void 0;
const blocks_home_1 = require("./blocks-home");
const data_admin_1 = require("./admin/data/data-admin");
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
 * @returns {Promise<void>}
 */
const updateHomeView = (app, userID, viewID, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateHomeView = yield app.client.views.update({
            token: process.env.SLACK_BOT_TOKEN,
            user_id: userID,
            view_id: viewID,
            view: {
                "type": "home",
                "blocks": yield blocks_home_1.blocksHome(userID, metadata)
            }
        });
        console.log('TRIGGER HOME VIEW UPDATE: app home view updated for userID', userID);
    }
    catch (err) {
        errors_1.slackErr(app, userID, err);
    }
});
exports.updateHomeView = updateHomeView;
/**
 * Fetch all saved user App Homes from database and update each one
 * @param {IObjectAny} app Slack App
 * @param {any} metadata some kind of metadata to pass to home view
 * @returns {Promise<void>}
 */
const updateAllHomes = (app, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all saved App Home views
        const allAppHomes = yield data_admin_1.getHomeViews();
        // Iterate over each user home in array and update home view
        allAppHomes.forEach((userHome) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const update = yield updateHomeView(app, userHome.userID, userHome.viewID, metadata);
            }
            catch (err) {
                errors_1.slackErr(app, userHome.userID, err);
            }
        }));
    }
    catch (err) {
        console.error(err);
    }
});
exports.updateAllHomes = updateAllHomes;
//# sourceMappingURL=update-view-home.js.map