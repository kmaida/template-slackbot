import errors from './../utils/errors';
import { IObjectAny } from './../types';

/*------------------
 MODAL DIALOG FORM
    Command
    Shortcut
    Button
------------------*/

const modal = (app: IObjectAny): void => {
  const openDialog = async ({ ack, body, context }) => {
    await ack();
    /**
     * PASSING DATA FROM INTERACTION TO VIEW SUBMISSION:
     * Hidden metadata can be sent in the modal view as private_metadata to modal-view-submit.ts.
     * Any data available in params here (e.g., body, context) is available to use as metadata.
     * This data comes from the interaction (command, shortcut, or button action) that triggers this modal.
     * The data varies in format depending on which trigger is used; uncomment the console log
     * below to examine this payload further.
     */
    // console.log(body);
    // If button value metadata is available, set it as metadata (e.g., useful for getting home view data)
    const btnMetadata = JSON.stringify(body.actions ? body.actions[0].value : {});
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'add_airtable_data',
          private_metadata: btnMetadata,
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
      errors.slackErr(app, body.user.id, err);
    }
  };
  // Command /add-data
  app.command('/add-data', openDialog);
  // Global shortcut to add Airtable data
  app.shortcut('add_airtable_data', openDialog);
  // Button from App Home
  app.action('btn_open_modal', openDialog);
};

export default modal;
