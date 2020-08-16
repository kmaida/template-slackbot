import { IObjectAny } from '../utils/types';

/*------------------
BUTTON: OPEN PROFILE MODAL
   with metadata
------------------*/

const btnOpenModalProfile = (metadata?: any): IObjectAny => {
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
}

export { btnOpenModalProfile };
