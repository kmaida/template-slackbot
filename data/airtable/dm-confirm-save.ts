import { slackErr } from '../../utils/errors';
import { IObjectAny, IATData } from '../../types';

/*------------------
  DM CONFIRM SAVE
------------------*/

const dmConfirmSave = async (app: IObjectAny, atData: IATData): Promise<any> => {
  const userID: string = atData.slackID;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: userID,
      text: `:tada: Your data has been saved successfully:\n*Name:* ${atData.name}\n*URL:* ${atData.url}\n*Notes:* ${atData.notes}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    slackErr(app, userID, err);
  }
};

export default dmConfirmSave;
