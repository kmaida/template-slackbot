import mongoose from 'mongoose';

/**
 * @interface IObjectAny An object with any properties
 */
export interface IObjectAny {
  [key: string]: any;
}
/**
 * @interface IATData Airtable data object
 */
export interface IATData {
  id?: string;
  name: string;
  url: string;
  notes: string;
  slackID: string;
  link?: string;
}
/**
 * @interface IAdminData Simple admin data object
 */
export interface IAdminData {
  channel: string;
  admins: string[];
}
/**
 * @interface IAdminDocument Admin data MongoDB document object
 */
export interface IAdminDocument extends IAdminData, mongoose.Document {}
