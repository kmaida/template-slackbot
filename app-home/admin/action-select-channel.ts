import { slackErr } from '../../utils/errors';
import { setChannel } from './data/data-admin';
import { IObjectAny } from '../../utils/types';
import { IAdminDocument } from './admin.interface';
import { updateAllHomes } from '../update-view-home';

/*------------------
 ACTION: SELECT CHANNEL
 Admins can select
 reporting channel
------------------*/

const actionSelectChannel = (app: IObjectAny, metadata: any): void => {
  app.action('a_select_channel', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new channel
    const newChannel: string = action.selected_channel;
    const settings: IAdminDocument = await setChannel(newChannel);
    // Update the reporting channel in the home view for all users
    try {
      const updateViews = await updateAllHomes(app, metadata);
    }
    catch (err) {
      slackErr(app, body.user.id, err);
    }
  });
};

export { actionSelectChannel };
