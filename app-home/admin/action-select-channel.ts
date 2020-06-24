import errors from '../../utils/errors';
import { adminApi } from './data-admin';
import { IAdminDocument, IObjectAny } from '../../types';

/*------------------
 ACTION: SELECT CHANNEL
 Admins can select
 reporting channel
------------------*/

const actionSelectChannel = (app: IObjectAny): void => {
  app.action('a_select_channel', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new channel
    const newChannel: string = action.selected_channel;
    const settings: IAdminDocument = await adminApi.setChannel(newChannel);
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

export default actionSelectChannel;
