import mongoose from 'mongoose';

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
  url: string;
  notes: string;
  slackID: string;
  link?: string;
};

/**
 * @interface IAdminData Simple admin data object
 */
interface IAdminData {
  channel: string;
  admins: string[];
};
interface IAdminDocument extends IAdminData, mongoose.Document { }

/**
 * @interface IAppHomeData user's App Home data
 */
interface IAppHomeData {
  userID: string;
  viewID: string;
};
interface IAppHomeDocument extends IAppHomeData, mongoose.Document {}

/**
 * Exports
 */
export { IObjectAny, IATData, IAdminData, IAdminDocument, IAppHomeData, IAppHomeDocument };
