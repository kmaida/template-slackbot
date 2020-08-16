import { slackErr } from '../utils/errors';
import { IObjectAny } from '../utils/types';
import { blocksModalProfile } from './blocks-modal-profile';
import { getUserInfo } from './data/data-profile-slack';
import { ISlackUserInfo } from './profile.interface';

/*------------------
 MODAL DIALOG FORM
    Command
    Shortcut
    Button
------------------*/

const modalProfile = (app: IObjectAny): void => {
  const openDialog = async ({ ack, body, context }): Promise<void> => {
    await ack();
    const userID: string = body.user.id;
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
    // Get user profile data from Slack API
    const userData: ISlackUserInfo = await getUserInfo(userID, app);
    // Set and stringify button value and Slack user data
    // This becomes the view's private_metadata, which is then available in the view submission
    const metadata: string = JSON.stringify({
      btnData,
      userData
    });
    try {
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
   * User interactions that trigger the modal
   */

  // Slash command: /profile
  app.command('/profile', openDialog);
  // Global shortcut to add Airtable data
  app.shortcut('add_profile', openDialog);
  // Button from App Home
  app.action('btn_open_modal_profile', openDialog);
};

export { modalProfile };
