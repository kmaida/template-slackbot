import errors from '../utils/errors';
import { IObjectAny, IATData } from '../types';

/*------------------
CHANNEL PUBLISH SAVE
------------------*/

const channelPublishSave = async (app: IObjectAny, atData: IATData): Promise<any> => {
  const channel = process.env.SLACK_CHANNEL_ID;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: `:tada: \`<@${atData.slackID}>\` has added:\n*Name:* ${atData.name}\n*URL:* ${atData.url}\n*Notes:* ${atData.notes}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    errors.slackErr(app, channel, err);
  }
};

export default channelPublishSave;
