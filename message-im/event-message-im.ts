import errors from '../utils/errors';
import utils from '../utils/utils';
import { IObjectAny } from '../types';

/*------------------
       BOT DM
------------------*/

const botDM = (app: IObjectAny): void => {
  app.event('message', utils.ignoreMention, async ({ event, context }) => {
    try {
      const sendMsg = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:shrug: I'm sorry, I didn't understand that. Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|Home tab>*.`
      });
    }
    catch (err) {
      errors.slackErr(app, event.channel, err);
    }
  });
};

export default botDM;
