/*------------------
   PROFILE TYPES
------------------*/

/**
 * @interface IProfile Airtable profile data object
 */
interface IProfile {
  id?: string;
  name: string;
  email: string;
  url: string;
  image: string;
  bio: string;
  slackID: string;
  link?: string;
};

/**
 * @interface IProfileInitial Prefilled data for initial profile modal form values
 */
interface IProfileInitial {
  id?: string;
  name: string;
  email: string;
  image?: string;
  url?: string;
  bio?: string;
};

/**
 * @interface ISlackUserInfo User profile data
 */
interface ISlackUserInfo {
  name: string;
  email: string;
  image: string;
};

export { IProfile, IProfileInitial, ISlackUserInfo };