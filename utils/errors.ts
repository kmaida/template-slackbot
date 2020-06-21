/*------------------
      ERRORS
------------------*/

const errors = {
  /*--
  Simple log and return error
  @param: {string} error message
  @return: {error}
  --*/
  storeErr(err) {
    const msg = err.msg || err;
    console.error('STORE ERROR:', msg);
    return new Error(msg);
  },
  /*--
  Send error to Slack in specified channel
  @param: {App} Slack app
  @param: {string} channel to send error in
  @param: {string} error message
  --*/
  async slackErr(app, channel: string, err: any) {
    const msg = err.message || err;
    console.error('ERROR:', msg);
    try {
      const sendErr = await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel,
        text: ":x: I'm sorry, I couldn't do that because an error occurred: ```" + JSON.stringify(msg) + "```"
      });
    }
    catch (err) {
      console.error('ERROR SENDING SLACK DM ERROR TO USER:', err);
    }
  }
};

export default errors;
