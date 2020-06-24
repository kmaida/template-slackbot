import errors from '../utils/errors';
import btnOpenModal from '../modal/btn-open-modal';
import { IObjectAny, IAdminDocument } from '../types';
import blocksHomeAdmin from './admin/blocks-home-admin';
import actionSelectChannel from './admin/action-select-channel';
import { adminApi } from './admin/data-admin';

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = (app: IObjectAny): void => {
  app.event('app_home_opened', async ({ event, context }) => {
    /**
     * Find the bot user ID to set in .env:
     * Uncomment the following line
     * Open the App Home, and check console logs
     */
    // console.log('Bot User ID:', context.botUserId);

    const userID: string = event.user;
    // Sample metadata to pass through btn-open-modal.ts -> modal.ts -> modal-view-submit.ts
    const metadata: IObjectAny = {
      event: event.type,
      msg: 'Event data from user home'
    };
    const adminSettings: IAdminDocument = await adminApi.getSettings();
    const initialChannel: string = adminSettings.channel;
    const initialAdmins: string[] = adminSettings.admins;
    const allUserBlocks: IObjectAny[] = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:wave: *Hello, <@${userID}>!* I'm <@${process.env.SLACK_BOT_ID}>.`
        }
      },
      {
        "type": "actions",
        "elements": [
          btnOpenModal(metadata)
        ]
      }
    ];
    /**
     * Determine if user is admin
     * If admin, add admin blocks to view
     * @returns {IObjectAny[]} array of home block objects
     */
    function composeHomeBlocks(): IObjectAny[] {
      if (initialAdmins.indexOf(userID) > -1) {
        const admin = blocksHomeAdmin(initialChannel, initialAdmins);
        return [...allUserBlocks, ...admin];
      } else {
        return allUserBlocks;
      }
    };
    
    /**
     * Publish user's App Home view
     */
    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: userID,
        view: {
          "type": "home",
          "blocks": composeHomeBlocks()
        }
      });
    }
    catch (err) {
      errors.slackErr(app, userID, err);
    }
  });

  /**
   * Set up action listeners for Home View
   */
  actionSelectChannel(app);
}

export default appHomeOpened;
