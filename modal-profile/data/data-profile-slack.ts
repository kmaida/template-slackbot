import { IObjectAny } from '../../utils/types';
import { ISlackUserInfo } from './../profile.interface';

/*------------------
 SLACK PROFILE DATA
------------------*/

/**
 * Get user data from Slack API (user profile)
 * @param {string} userID user's Slack ID
 * @param {IObjectAny} app Slack App
 * @returns {Promise<ISlackUserInfo>}
 */
const getUserInfo = async (userID: string, app: IObjectAny): Promise<ISlackUserInfo> => {
  try {
    const _slackUserInfo: IObjectAny = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: userID
    });
    // console.log(_slackUserInfo);
    // Pull out only desired info from Slack user profile
    const userData: ISlackUserInfo = {
      name: _slackUserInfo.user.profile.real_name_normalized,
      email: _slackUserInfo.user.profile.email,
      image: _slackUserInfo.user.profile.image_512
    };
    return userData;
  }
  catch (err) {
    console.error(err);
  }
}

export { getUserInfo };