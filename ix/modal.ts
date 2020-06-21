import errors from '../utils/errors';

/*------------------
 MODAL DIALOG FORM
 Command & global shortcut
------------------*/

const modal = (app) => {
  const openDialog = async ({ ack, body, context }) => {
    await ack();
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'add_airtable_data',
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
};

export default modal;
