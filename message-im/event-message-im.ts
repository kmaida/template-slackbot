import { slackErr } from '../utils/errors';
import { ignoreMention } from '../utils/utils';
import { IObjectAny } from '../utils/types';

/*------------------
       BOT DM
------------------*/

const botDM = (app: IObjectAny): void => {
  app.event('message', ignoreMention, async ({ event, context }) => {
    try {
      const sendMsg = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:shrug: I'm sorry, I didn't understand that. Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|Home tab>*.`
      });
    }
    catch (err) {
      slackErr(app, event.channel, err);
    }
  });
};

export { botDM };
