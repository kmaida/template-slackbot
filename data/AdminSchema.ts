import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { IAdminDocument } from './../types';

/*------------------
   ADMIN SCHEMA
------------------*/

const adminSchema = new Schema({
  channel: { type: String, required: true },
  admins: [String]
});

export default mongoose.model<IAdminDocument>('Admin', adminSchema);
