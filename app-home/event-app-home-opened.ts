import { slackErr } from '../utils/errors';
import { IObjectAny } from '../utils/types';
import { actionSelectChannel } from './admin/action-select-channel';
import { actionSelectAdmins } from './admin/action-select-admins';
import { blocksHome } from './blocks-home';
import { saveHomeView } from './admin/data/data-admin';

/*------------------
  APP HOME OPENED
------------------*/

let metadata: IObjectAny;

const appHomeOpened = (app: IObjectAny): void => {
  app.event('app_home_opened', async ({ event, context }) => {
    /**
     * Find the bot user ID to set in .env:
     * Uncomment the following line
     * Open the App Home, and check console logs
     */
    // console.log('Bot User ID:', context.botUserId);

    const userID: string = event.user;
    // Sample home view metadata to pass through btn-open-modal-profile.ts -> modal.ts -> modal-view-submit.ts
    metadata = {
      event: event.type,
      msg: 'Metadata from user home'
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
      // Set this user's home view ID in database
      const saveView = await saveHomeView(userID, showHomeView.view.id);
    }
    catch (err) {
      slackErr(app, userID, err);
    }
  });

  /**
   * Set up action listeners for Home View
   */
  actionSelectChannel(app, metadata);
  actionSelectAdmins(app, metadata);
}

export { appHomeOpened };
