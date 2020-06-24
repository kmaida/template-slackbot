import errors from '../utils/errors';
import utils from '../utils/utils';
import { IObjectAny } from '../types';

/*------------------
    APP MENTION
------------------*/

const appMention = (app: IObjectAny): void => {
  app.event('app_mention', utils.ignoreMention, async ({ event, context }) => {
    try {
      const result = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:wave: Thanks for reaching out! Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
      });
    }
    catch (err) {
      errors.slackErr(app, event.channel, err);
    }
  });
};

export default appMention;
