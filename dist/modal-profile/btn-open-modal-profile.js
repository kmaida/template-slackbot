"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btnOpenModalProfile = void 0;
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
        // Passing data through modals: metadata can be sent from interactions
        // E.g., as button value, and then is available in modal.ts in body.actions
        // From the modal view, it goes to the view submission as private_metadata
        "value": metadata ? JSON.stringify(metadata) : undefined,
        "style": "primary"
    };
};
exports.btnOpenModalProfile = btnOpenModalProfile;
//# sourceMappingURL=btn-open-modal-profile.js.map