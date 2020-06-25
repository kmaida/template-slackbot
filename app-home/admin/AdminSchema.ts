import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { IAdminDocument, IAppHomeDocument } from '../../types';

/*------------------
   ADMIN SCHEMAS
------------------*/

/**
 * Admin settings object
 */
const adminSchema = new Schema({
  channel: { type: String, required: true },
  admins: [String]
});
const AdminSettingsModel = mongoose.model<IAdminDocument>('Admin', adminSchema);

/**
 * User's app home view
 */
const appHomeSchema = new Schema({
  userID: { type: String, required: true },
  viewID: { type: String, required: true }
});
const AppHomeModel = mongoose.model<IAppHomeDocument>('AppHome', appHomeSchema);

export { AdminSettingsModel, AppHomeModel };
