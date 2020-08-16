import { IObjectAny } from '../utils/types';
import { blocksHome } from './blocks-home';
import { getHomeViews } from './admin/data/data-admin';
import { slackErr } from './../utils/errors';

/*------------------
BLOCKS: UPDATE HOME VIEW
------------------*/

/**
 * Update the app home view (when data in it has changed)
 * @param {IObjectAny} app Slack App
 * @param {string} userID Slack ID of user whose home view is being updated
 * @param {string} viewID view ID of user whose home view is being updated
 * @param {any} metadata metadata passing from home view to modal button
 * @returns {Promise<void>}
 */
const updateHomeView = async (app: IObjectAny, userID: string, viewID: string, metadata: any): Promise<void> => {
  try {
    const updateHomeView = await app.client.views.update({
      token: process.env.SLACK_BOT_TOKEN,
      user_id: userID,
      view_id: viewID,
      view: {
        "type": "home",
        "blocks": await blocksHome(userID, metadata)
      }
    });
    console.log('TRIGGER HOME VIEW UPDATE: app home view updated for userID', userID);
  }
  catch (err) {
    slackErr(app, userID, err);
  }
}

/**
 * Fetch all saved user App Homes from database and update each one
 * @param {IObjectAny} app Slack App 
 * @param {any} metadata some kind of metadata to pass to home view
 * @returns {Promise<void>}
 */
const updateAllHomes = async (app: IObjectAny, metadata: any): Promise<void> => {
  try {
    // Get all saved App Home views
    const allAppHomes = await getHomeViews();
    // Iterate over each user home in array and update home view
    allAppHomes.forEach(async (userHome) => {
      try {
        const update = await updateHomeView(app, userHome.userID, userHome.viewID, metadata);
      }
      catch (err) {
        slackErr(app, userHome.userID, err);
      }
    });
  }
  catch (err) {
    console.error(err);
  }
}

export { updateHomeView, updateAllHomes };
