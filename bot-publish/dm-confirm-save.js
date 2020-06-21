const errors = require('./../utils/errors');

/*------------------
  DM CONFIRM SAVE
------------------*/

const dmConfirmSave = async (app, atData) => {
  const userID = atData.slackID;
  try {
    const sendMsg = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: userID,
      text: `:tada: Your data has been saved successfully:\n*Name:* ${atData.name}\n*URL:* ${atData.url}\n*Notes:* ${atData.notes}\n<${atData.link}|View in Airtable>`,
      unfurl_links: false
    });
  }
  catch (err) {
    errors.slackErr(app, userID, err);
  }
};

module.exports = dmConfirmSave;
