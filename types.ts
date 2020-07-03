import mongoose from 'mongoose';

/*------------------
  TYPE INTERFACES
------------------*/

/**
 * @interface IObjectAny An object with any properties
 */
interface IObjectAny {
  [key: string]: any;
}

/**
 * @interface IAdminData Simple admin data object
 */
interface IAdminData {
  channel: string;
  admins: string[];
};
interface IAdminDocument extends IAdminData, mongoose.Document {};

/**
 * @interface IAppHomeData user's App Home data
 */
interface IAppHomeData {
  userID: string;
  viewID: string;
};
interface IAppHomeDocument extends IAppHomeData, mongoose.Document {};

/**
 * @interface ISlackUserData User profile data
 */
interface ISlackUserData {
  name: string;
  email: string;
  image: string;
};

/**
 * Exports
 */
export { IObjectAny, IAdminData, IAdminDocument, IAppHomeData, IAppHomeDocument, ISlackUserData };
