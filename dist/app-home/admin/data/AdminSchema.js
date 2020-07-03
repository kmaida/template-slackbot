"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHomeModel = exports.AdminSettingsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const AdminSettingsModel = mongoose_1.default.model('Admin', adminSchema);
exports.AdminSettingsModel = AdminSettingsModel;
/**
 * User's app home view
 */
const appHomeSchema = new Schema({
    userID: { type: String, required: true },
    viewID: { type: String, required: true }
});
const AppHomeModel = mongoose_1.default.model('AppHome', appHomeSchema);
exports.AppHomeModel = AppHomeModel;
//# sourceMappingURL=AdminSchema.js.map