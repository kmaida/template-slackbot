import { slackErr } from '../utils/errors';
import { IObjectAny } from '../utils/types';
import { IProfile } from './profile.interface';

/*------------------
  DM CONFIRM SAVE
------------------*/

const dmConfirmSave = async (app: IObjectAny, atData: IProfile): Promise<void> => {
  const userID: string = atData.slackID;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: userID,
      text: `:tada: Your data has been saved successfully:\n*Name:* ${atData.name}\n*Email:* ${atData.email}\n*Image:* ${atData.image}\n*URL:* ${atData.url}\n*Bio:* ${atData.bio}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    slackErr(app, userID, err);
  }
};

export { dmConfirmSave };
