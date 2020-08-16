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
exports.modalProfile = void 0;
const errors_1 = require("../utils/errors");
const blocks_modal_profile_1 = require("./blocks-modal-profile");
const data_profile_slack_1 = require("./data/data-profile-slack");
/*------------------
 MODAL DIALOG FORM
    Command
    Shortcut
    Button
------------------*/
const modalProfile = (app) => {
    const openDialog = ({ ack, body, context }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        const userID = body.user.id;
        /**
         * PASSING DATA FROM INTERACTION TO VIEW SUBMISSION:
         * Hidden metadata can be sent in the modal view as private_metadata to modal-view-submit.ts.
         * Any data available in params here (e.g., body, context) is available to use as metadata.
         * This data comes from the interaction (command, shortcut, or button action) that triggers this modal.
         * The data varies in format depending on which trigger is used; uncomment the console log
         * below to examine this payload further.
         */
        // console.log(body.actions);
        // If button value metadata is available, set it as metadata (e.g., useful for getting home view data, for example)
        const btnData = body.actions ? body.actions[0].value : {};
        // Get user profile data from Slack API
        const userData = yield data_profile_slack_1.getUserInfo(userID, app);
        // Set and stringify button value and Slack user data
        // This becomes the view's private_metadata, which is then available in the view submission
        const metadata = JSON.stringify({
            btnData,
            userData
        });
        try {
            const openView = yield app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: {
                    type: 'modal',
                    callback_id: 'add_profile',
                    private_metadata: metadata,
                    title: {
                        type: 'plain_text',
                        text: 'Add Profile'
                    },
                    blocks: blocks_modal_profile_1.blocksModalProfile(userData),
                    submit: {
                        type: 'plain_text',
                        text: 'Save Profile'
                    }
                }
            });
        }
        catch (err) {
            errors_1.slackErr(app, userID, err);
        }
    });
    /**
     * User interactions that trigger the modal
     */
    // Slash command: /profile
    app.command('/profile', openDialog);
    // Global shortcut to add Airtable data
    app.shortcut('add_profile', openDialog);
    // Button from App Home
    app.action('btn_open_modal_profile', openDialog);
};
exports.modalProfile = modalProfile;
//# sourceMappingURL=modal-profile.js.map