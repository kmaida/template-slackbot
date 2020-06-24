import errors from '../utils/errors';
import { IObjectAny } from '../types';
import actionSelectChannel from './admin/action-select-channel';
import actionSelectAdmins from './admin/action-select-admins';
import blocksHome from './blocks-home';

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
    /**
     * Publish user's App Home view
     */
    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: userID,
        view: {
          "type": "home",
          "blocks": await blocksHome(userID, metadata)
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
  actionSelectAdmins(app);
}

export default appHomeOpened;
