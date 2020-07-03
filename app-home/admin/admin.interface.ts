import mongoose from 'mongoose';

/*------------------
ADMIN TYPE INTERFACES
------------------*/

/**
 * @interface IAdminData Simple admin data object
 */
interface IAdminData {
  channel: string;
  admins: string[];
};
interface IAdminDocument extends IAdminData, mongoose.Document {};

/**
 * Exports
 */
export { IAdminData, IAdminDocument };
