import errors from './../utils/errors';
import utils from './../utils/utils';
import { IObjectAny } from './../types';

/*------------------
    APP MENTION
------------------*/

const appMention = (app: IObjectAny): void => {
  app.event('app_mention', async ({ event, context }) => {
    // Ignore message edited and topic change subtypes
    // (Slack bug causing listener middleware not to work)
    // (This is an alternative solution)
    if (utils.ignoreMention(event.subtype)) return;
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
