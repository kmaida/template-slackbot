import { IProfileInitial } from './profile.interface';
import { falseyToEmptyStr } from '../utils/utils';
import { IObjectAny } from '../utils/types';

/*------------------
BLOCKS: MODAL PROFILE FORM
------------------*/

const blocksModalProfile = (prefill: IProfileInitial = { name: '', email: '' }): IObjectAny[] => {
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
        "initial_value": falseyToEmptyStr(prefill.url)
      },
      "label": {
        "type": "plain_text",
        "text": "URL:"
      }
    },
    {
      "type": "input",
      "block_id": "b_bio",
      "element": {
        "type": "plain_text_input",
        "action_id": "a_bio",
        "multiline": true,
        "initial_value": falseyToEmptyStr(prefill.bio),
      },
      "label": {
        "type": "plain_text",
        "text": "Bio:"
      },
      "optional": true
    }
  ];
}

export { blocksModalProfile };