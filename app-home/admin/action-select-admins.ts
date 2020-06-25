import { setAdmins } from './data-admin';
import { IAdminDocument, IObjectAny } from '../../types';

/*------------------
 ACTION: SELECT ADMINS
 Admins can select
 admin users
------------------*/

const actionSelectAdmins = (app: IObjectAny): void => {
  app.action('a_select_admins', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new admins
    const newAdmins: string[] = action.selected_users;
    const settings: IAdminDocument = await setAdmins(newAdmins);
    // Update the admins in the home view for all users
    // try {
    //   const allUserHomes = await userHomeStore.getUserHomes();
    //   allUserHomes.forEach(async (userHome) => {
    //     const userHomeParams = {
    //       userID: userHome.userID,
    //       viewID: userHome.viewID,
    //       botID: context.botUserId,
    //       channel: settings.channel,
    //       admins: newAdmins
    //     };
    //     await triggerHomeViewUpdate(app, userHomeParams, at);
    //   });
    // }
    // catch (err) {
    //   errSlack(app, body.user.id, err);
    // }
  });
};

export default actionSelectAdmins;
