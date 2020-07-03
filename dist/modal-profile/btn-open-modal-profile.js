"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------
BUTTON: OPEN PROFILE MODAL
   with metadata
------------------*/
const btnOpenModalProfile = (metadata) => {
    return {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Add Profile"
        },
        "action_id": "btn_open_modal_profile",
        // Example: metadata can be sent in triggers (e.g., as button value and then is available in modal.ts in body.actions)
        "value": metadata ? JSON.stringify(metadata) : undefined,
        "style": "primary"
    };
};
exports.default = btnOpenModalProfile;
//# sourceMappingURL=btn-open-modal-profile.js.map