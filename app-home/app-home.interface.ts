import mongoose from 'mongoose';

/*------------------
APP HOME TYPE INTERFACES
------------------*/

/**
 * @interface IAppHomeData user's App Home data
 */
interface IAppHomeData {
  userID: string;
  viewID: string;
};
interface IAppHomeDocument extends IAppHomeData, mongoose.Document { };

/**
 * Exports
 */
export { IAppHomeData, IAppHomeDocument };
