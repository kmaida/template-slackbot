import { slackErr } from '../utils/errors';
import { IObjectAny } from '../types';
import blocksModalProfile from './blocks-modal-profile';
import { getUserData } from '../utils/data-slack';

/*------------------
 MODAL DIALOG FORM
    Command
    Shortcut
    Button
------------------*/

const modalProfile = (app: IObjectAny): void => {
  const openDialog = async ({ ack, body, context }) => {
    await ack();
    const userID = body.user.id;
    /**
     * PASSING DATA FROM INTERACTION TO VIEW SUBMISSION:
     * Hidden metadata can be sent in the modal view as private_metadata to modal-view-submit.ts.
     * Any data available in params here (e.g., body, context) is available to use as metadata.
     * This data comes from the interaction (command, shortcut, or button action) that triggers this modal.
     * The data varies in format depending on which trigger is used; uncomment the console log
     * below to examine this payload further.
     */
    // console.log(body.actions);
    // If button value metadata is available, set it as metadata (e.g., useful for getting home view data, for example)
    const btnData = body.actions ? body.actions[0].value : {};
    const userData = await getUserData(userID, app);
    const metadata = JSON.stringify({
      btnData,
      userData
    });
    try {
      // Get user profile data from Slack API
      const userData = await getUserData(userID, app);
      const openView = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'add_profile',
          private_metadata: metadata,
          title: {
            type: 'plain_text',
            text: 'Add Profile'
          },
          blocks: blocksModalProfile(userData),
          submit: {
            type: 'plain_text',
            text: 'Save Profile'
          }
        }
      });
    }
    catch (err) {
      slackErr(app, userID, err);
    }
  };

  /**
   * Interactions that trigger the modal
   */
  // Slash command: /profile
  app.command('/profile', openDialog);
  // Global shortcut to add Airtable data
  app.shortcut('add_profile', openDialog);
  // Button from App Home
  app.action('btn_open_modal_profile', openDialog);
};

export default modalProfile;
