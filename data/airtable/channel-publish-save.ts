import { slackErr } from '../../utils/errors';
import { IObjectAny, IATData, IAdminDocument } from '../../types';
import { getAdminSettings } from '../../app-home/admin/data-admin';

/*------------------
CHANNEL PUBLISH SAVE
------------------*/

const channelPublishSave = async (app: IObjectAny, atData: IATData): Promise<any> => {
  const settings: IAdminDocument = await getAdminSettings();
  const channel: string = settings.channel;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: `:tada: \`<@${atData.slackID}>\` has added:\n*Name:* ${atData.name}\n*URL:* ${atData.url}\n*Notes:* ${atData.notes}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    slackErr(app, channel, err);
  }
};

export default channelPublishSave;
