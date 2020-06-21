import errors from './../utils/errors';

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app) => {
  app.event('app_home_opened', async ({ event, context }) => {
    // Find the bot user ID to set in .env:
    // Uncomment the following line
    // Open the App Home, and check console logs
    // console.log('Bot User ID:', context.botUserId);
    const userID: string = event.user;

    // Publish this user's home view
    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: userID,
        view: {
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `:wave: *Hello, <@${userID}>!* I'm <@${process.env.SLACK_BOT_ID}>.`
              }
            }
          ]
        }
      });
    }
    catch (err) {
      errors.slackErr(app, userID, err);
    }
  });
}

export default appHomeOpened;
