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
/*------------------
 MODAL DIALOG FORM
 Command & global shortcut
------------------*/
const modal = (app) => {
    const openDialog = ({ ack, body, context }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        try {
            const result = yield app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: {
                    type: 'modal',
                    callback_id: 'add_airtable_data',
                    private_metadata: JSON.stringify({ greeting: 'hi' }),
                    title: {
                        type: 'plain_text',
                        text: 'Add Airtable Data'
                    },
                    blocks: [
                        {
                            "type": "input",
                            "block_id": "b_name",
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "a_name",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Name"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Name:"
                            }
                        },
                        {
                            "type": "input",
                            "block_id": "b_url",
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "a_url",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "URL"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "URL:"
                            }
                        },
                        {
                            "type": "input",
                            "block_id": "b_notes",
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "a_notes",
                                "multiline": true,
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Add notes"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Notes:"
                            },
                            "optional": true
                        }
                    ],
                    submit: {
                        type: 'plain_text',
                        text: 'Save'
                    }
                }
            });
        }
        catch (err) {
            errors_1.default.slackErr(app, body.user.id, err);
        }
    });
    // Command /add-data
    app.command('/add-data', openDialog);
    // Global shortcut to add Airtable data
    app.shortcut('add_airtable_data', openDialog);
};
exports.default = modal;
//# sourceMappingURL=modal.js.map