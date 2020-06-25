import { IObjectAny } from "../types";
import blocksHome from './blocks-home';
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
 */
const updateHomeView = async (app: IObjectAny, userID: string, viewID: string, metadata: any) => {
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
    console.log('TRIGGER HOME VIEW UPDATE: app home view updated for viewID', viewID);
  }
  catch (err) {
    slackErr(app, userID, err);
  }
}

module.exports = updateHomeView;
