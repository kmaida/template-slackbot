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
 * @interface IATData Airtable data object
 */
interface IATData {
  id?: string;
  name: string;
  email: string;
  url: string;
  notes: string;
  slackID: string;
  link?: string;
};

/**
 * @interface IATDataInitial Prefilled data for initial modal form values
 */
interface IATDataInitial {
  id?: string;
  name: string;
  email: string;
  url?: string;
  notes?: string;
};

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
};

/**
 * Exports
 */
export { IObjectAny, IATData, IATDataInitial, IAdminData, IAdminDocument, IAppHomeData, IAppHomeDocument, ISlackUserData };
