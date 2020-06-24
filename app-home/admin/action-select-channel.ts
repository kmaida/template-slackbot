import errors from '../../utils/errors';
import { adminApi } from './data-admin';

/*------------------
 ACTION: SELECT CHANNEL
 Admins can select
 reporting channel
------------------*/

const adminSelectChannel = (app) => {
  app.action('a_select_channel', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new channel
    const newChannel = action.selected_channel;
    const settings = await adminApi.setChannel(newChannel);
    // Update the reporting channel in the home view for all users
    // try {
    //   const allUserHomes = await userHomeStore.getUserHomes();
    //   allUserHomes.forEach(async (userHome) => {
    //     const userHomeParams = {
    //       userID: userHome.userID,
    //       viewID: userHome.viewID,
    //       botID: context.botUserId,
    //       channel: newChannel,
    //       admins: settings.admins
    //     };
    //     await triggerHomeViewUpdate(app, userHomeParams, at);
    //   });
    // }
    // catch (err) {
    //   errors.slackErr(app, body.user.id, err);
    // }
  });
};

export default adminSelectChannel;
