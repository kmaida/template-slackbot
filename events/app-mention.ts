import errors from './../utils/errors';
import ignoreMsg from './../middleware/ignore-message';

/*------------------
    APP MENTION
------------------*/

const appMention = (app) => {
  app.event('app_mention', ignoreMsg, async ({ event, context }) => {
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