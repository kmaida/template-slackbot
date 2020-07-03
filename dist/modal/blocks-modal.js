"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
/*------------------
 BLOCKS: MODAL FORM
------------------*/
const blocksModal = (prefill = { name: '', email: '' }) => {
    return [
        {
            "type": "input",
            "block_id": "b_name",
            "element": {
                "type": "plain_text_input",
                "action_id": "a_name",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Firstname Lastname"
                },
                "initial_value": prefill.name
            },
            "label": {
                "type": "plain_text",
                "text": "Name:"
            }
        },
        {
            "type": "input",
            "block_id": "b_email",
            "element": {
                "type": "plain_text_input",
                "action_id": "a_email",
                "placeholder": {
                    "type": "plain_text",
                    "text": "you@domain.com"
                },
                "initial_value": prefill.email
            },
            "label": {
                "type": "plain_text",
                "text": "Email:"
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
                    "text": "https://"
                },
                "initial_value": utils_1.falseyToEmptyStr(prefill.url)
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
                },
                "initial_value": utils_1.falseyToEmptyStr(prefill.notes),
            },
            "label": {
                "type": "plain_text",
                "text": "Notes:"
            },
            "optional": true
        }
    ];
};
exports.default = blocksModal;
//# sourceMappingURL=blocks-modal.js.map