import { IObjectAny } from '../types';

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
    // Example: metadata can be sent in triggers (e.g., as button value and then is available in modal.ts in body.actions)
    "value": metadata ? JSON.stringify(metadata) : undefined,
    "style": "primary"
  };
}

export default btnOpenModalProfile;
