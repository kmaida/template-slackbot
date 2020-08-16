import { slackErr } from '../utils/errors';
import { ignoreMention } from '../utils/utils';
import { IObjectAny } from '../utils/types';

/*------------------
    APP MENTION
------------------*/

const appMention = (app: IObjectAny): void => {
  app.event('app_mention', ignoreMention, async ({ event, context }) => {
    try {
      const result = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:wave: Thanks for reaching out! Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
      });
    }
    catch (err) {
      slackErr(app, event.channel, err);
    }
  });
};

export { appMention };
