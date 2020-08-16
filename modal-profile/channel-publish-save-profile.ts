import { slackErr } from '../utils/errors';
import { IObjectAny } from '../utils/types';
import { IAdminDocument } from './../app-home/admin/admin.interface';
import { getAdminSettings } from '../app-home/admin/data/data-admin';
import { IProfile } from './profile.interface';

/*------------------
CHANNEL PUBLISH SAVE PROFILE
------------------*/

const channelPublishSave = async (app: IObjectAny, atData: IProfile): Promise<void> => {
  const settings: IAdminDocument = await getAdminSettings();
  const channel: string = settings.channel;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: `:tada: \`<@${atData.slackID}>\` has added:\n*Name:* ${atData.name}\n*Email:* ${atData.email}\n*Image:* ${atData.image}\n*URL:* ${atData.url}\n*Bio:* ${atData.bio}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    slackErr(app, channel, err);
  }
};

export { channelPublishSave };
