import { setAdmins } from './data/data-admin';
import { IObjectAny } from '../../utils/types';
import { IAdminDocument } from './admin.interface';
import { updateAllHomes } from '../update-view-home';
import { slackErr } from '../../utils/errors';

/*------------------
 ACTION: SELECT ADMINS
 Admins can select
 admin users
------------------*/

const actionSelectAdmins = (app: IObjectAny, metadata: any): void => {
  app.action('a_select_admins', async ({ action, ack, body }) => {
    await ack();
    // Set the new admins
    const newAdmins: string[] = action.selected_users;
    const settings: IAdminDocument = await setAdmins(newAdmins);
    // Update the admins home view for all users
    try {
      const updateViews = await updateAllHomes(app, metadata);
    }
    catch (err) {
      slackErr(app, body.user.id, err);
    }
  });
};

export { actionSelectAdmins };
