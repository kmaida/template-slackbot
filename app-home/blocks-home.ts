import btnOpenModal from '../modal/btn-open-modal';
import { IObjectAny, IAdminDocument } from '../types';
import blocksHomeAdmin from './admin/blocks-home-admin';
import { getAdminSettings } from './admin/data-admin';

/*------------------
 BLOCKS: HOME VIEW
------------------*/

const blocksHome = async (userID: string, metadata: any): Promise<IObjectAny> => {
  const adminSettings: IAdminDocument = await getAdminSettings();
  const initialChannel: string = adminSettings.channel;
  const initialAdmins: string[] = adminSettings.admins;
  const allUserBlocks: IObjectAny[] = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:wave: *Hello, <@${userID}>!* I'm <@${process.env.SLACK_BOT_ID}>.`
      }
    },
    {
      "type": "actions",
      "elements": [
        btnOpenModal(metadata)
      ]
    }
  ];
  /**
   * Determine if user is admin
   * If admin, add admin blocks to view
   * @returns {IObjectAny[]} array of home block objects
   */
  function composeHomeBlocks(): IObjectAny[] {
    if (initialAdmins.indexOf(userID) > -1) {
      const admin = blocksHomeAdmin(initialChannel, initialAdmins);
      return [...allUserBlocks, ...admin];
    } else {
      return allUserBlocks;
    }
  };
  return composeHomeBlocks();
}

export default blocksHome;
