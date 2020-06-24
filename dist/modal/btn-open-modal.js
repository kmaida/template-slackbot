"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------
 BUTTON: OPEN MODAL
   with metadata
------------------*/
const btnOpenModal = (metadata) => {
    return {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Open Modal"
        },
        "action_id": "btn_open_modal",
        // Example: metadata can be sent in triggers (e.g., as button value and then is available in modal.ts in body.actions)
        "value": metadata ? JSON.stringify(metadata) : undefined,
        "style": "primary"
    };
};
exports.default = btnOpenModal;
//# sourceMappingURL=btn-open-modal.js.map