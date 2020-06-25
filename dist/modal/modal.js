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
const errors_1 = require("../utils/errors");
const blocks_modal_1 = __importDefault(require("./blocks-modal"));
/*------------------
 MODAL DIALOG FORM
    Command
    Shortcut
    Button
------------------*/
const modal = (app) => {
    const openDialog = ({ ack, body, context }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        /**
         * PASSING DATA FROM INTERACTION TO VIEW SUBMISSION:
         * Hidden metadata can be sent in the modal view as private_metadata to modal-view-submit.ts.
         * Any data available in params here (e.g., body, context) is available to use as metadata.
         * This data comes from the interaction (command, shortcut, or button action) that triggers this modal.
         * The data varies in format depending on which trigger is used; uncomment the console log
         * below to examine this payload further.
         */
        // console.log(body.actions);
        // If button value metadata is available, set it as metadata (e.g., useful for getting home view data)
        const btnMetadata = JSON.stringify(body.actions ? body.actions[0].value : {});
        try {
            const result = yield app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: {
                    type: 'modal',
                    callback_id: 'add_airtable_data',
                    private_metadata: btnMetadata,
                    title: {
                        type: 'plain_text',
                        text: 'Add Airtable Data'
                    },
                    blocks: blocks_modal_1.default(),
                    submit: {
                        type: 'plain_text',
                        text: 'Save'
                    }
                }
            });
        }
        catch (err) {
            errors_1.slackErr(app, body.user.id, err);
        }
    });
    /**
     * Interactions that trigger the modal
     */
    // Slash command: /add-data
    app.command('/add-data', openDialog);
    // Global shortcut to add Airtable data
    app.shortcut('add_airtable_data', openDialog);
    // Button from App Home
    app.action('btn_open_modal', openDialog);
};
exports.default = modal;
//# sourceMappingURL=modal.js.map