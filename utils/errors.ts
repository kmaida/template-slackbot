import { IObjectAny } from './types';

/*------------------
      ERRORS
------------------*/

/**
 * Simple log and return error
 * @param {IObjectAny|string} err object or error message
 * @return {IObjectAny} error object
 */
const storeErr = (err: any): IObjectAny => {
  const msg: string = err.msg || err;
  console.error('STORE ERROR:', msg);
  return new Error(msg);
}

/**
 * Send error to Slack in specified channel
 * @param {IObjectAny} app Slack app
 * @param {string} channel to publish message in
 * @param {string} err message
 */
const slackErr = async (app: IObjectAny, channel: string, err: any): Promise<void> => {
  const msg: string = err.message || err;
  console.error('ERROR:', msg);
  try {
    const sendErr = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: ":x: I'm sorry, I couldn't do that because an error occurred: ```" + JSON.stringify(msg) + "```"
    });
  }
  catch (err) {
    console.error('ERROR DELIVERING SLACK MESSAGE ERROR:', err);
  }
};

export { storeErr, slackErr };
