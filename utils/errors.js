/*------------------
      ERRORS
------------------*/

const errors = {
  /*--
  Simple log and return error
  @Param: error message (string)
  @Return: Error
  --*/
  storeErr(err) {
    const msg = err.msg || err;
    console.error('STORE ERROR:', msg);
    return new Error(msg);
  },
  /*--
  Send error to Slack in specified channel
  @Param: Slack app
  @Param: channel to send error in (string)
  @Param: error message (string)
  --*/
  async slackErr(app, channel, err) {
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

module.exports = errors;