import { IObjectAny } from '../types';

/*------------------
 BUTTON: OPEN MODAL
   with metadata
------------------*/

const btnOpenModal = (metadata?: any): IObjectAny => {
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
}

export default btnOpenModal;
