import { slackErr } from '../utils/errors';
import { IObjectAny } from '../types';
import blocksModal from './blocks-modal';

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
    // console.log(body.actions);
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
          blocks: blocksModal(),
          submit: {
            type: 'plain_text',
            text: 'Save'
          }
        }
      });
    }
    catch (err) {
      slackErr(app, body.user.id, err);
    }
  };

  /**
   * Interactions that trigger the modal
   */
  // Slash command: /add-data
  app.command('/add-data', openDialog);
  // Global shortcut to add Airtable data
  app.shortcut('add_airtable_data', openDialog);
  // Button from App Home
  app.action('btn_open_modal', openDialog);
};

export default modal;
