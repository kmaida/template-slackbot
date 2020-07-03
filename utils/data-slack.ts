import { IObjectAny, ISlackUserData } from '../types';

/*------------------
     SLACK DATA
------------------*/

/**
 * Get user data from Slack API (user profile)
 * @param {string} userID user's Slack ID
 * @param {IObjectAny} app Slack App
 * @returns {Promise<ISlackUserData}
 */
const getUserData = async (userID: string, app: IObjectAny): Promise<ISlackUserData> => {
  try {
    const _userInfo = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: userID
    });
    // console.log(_userInfo);
    const userData: ISlackUserData = {
      name: _userInfo.user.profile.real_name_normalized,
      email: _userInfo.user.profile.email,
      image: _userInfo.user.profile.image_512
    };
    return userData;
  }
  catch (err) {
    console.error(err);
  }
}

export { getUserData };