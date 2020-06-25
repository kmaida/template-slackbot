"use strict";
/*------------------
 BLOCKS: MODAL FORM
------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const blocksModal = () => {
    return [
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
    ];
};
exports.default = blocksModal;
//# sourceMappingURL=blocks-modal.js.map