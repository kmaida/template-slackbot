"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApi = exports.initAdminSettings = void 0;
const AdminSchema_1 = __importDefault(require("./AdminSchema"));
/*------------------
ADMINS SETTINGS API
------------------*/
/**
 * Database error handler
 * @param {IObjectAny}
 * @return {IObjectAny} Error object
 */
const dbErrHandler = (err) => {
    const errMsg = `ADMIN SETTINGS DB Error: ${err.message || err}`;
    console.error(errMsg);
    return new Error(errMsg);
};
/**
   * Initialize and set settings from ENV if there are no settings in DB
   * @return {Promise<IAdminDocument>} promise: admin settings document
   */
const initAdminSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.default.findOne({}, (err, settings) => {
        if (err)
            return dbErrHandler(err);
        if (!settings) {
            const newSettings = new AdminSchema_1.default({
                channel: process.env.SLACK_CHANNEL_ID,
                admins: process.env.SLACK_ADMINS.split(',')
            });
            newSettings.save((err) => {
                if (err)
                    return dbErrHandler(err);
                console.log('ADMIN DB: Set new admin settings from environment variables');
                return newSettings;
            });
        }
    });
});
exports.initAdminSettings = initAdminSettings;
/**
 * Exported object containing API endpoints
 */
const adminApi = {
    /**
     * Get settings object
     * @return {Promise<IAdminDocument>} promise: admin settings document
     */
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            return AdminSchema_1.default.findOne({}, (err, settings) => {
                if (err)
                    return dbErrHandler(err);
                if (!settings)
                    return new Error('ADMIN DB: No admin settings are saved');
                return settings;
            });
        });
    },
    /**
     * Save reporting channel to store
     * @param {string} channel channel ID to save to DB
     * @return {Promise<IAdminDocument>} promise: admin settings document
     */
    setChannel(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            return AdminSchema_1.default.findOne({}, (err, settings) => {
                if (err)
                    return dbErrHandler(err);
                if (!channel)
                    return dbErrHandler({ message: 'No channel provided' });
                // No settings exist yet; save new settings document
                if (!settings) {
                    const newSettings = new AdminSchema_1.default({
                        channel: channel,
                        admins: process.env.SLACK_ADMINS.split(',')
                    });
                    newSettings.save((err) => {
                        if (err)
                            return dbErrHandler(err);
                        return newSettings;
                    });
                }
                // Update existing settings object
                else {
                    settings.channel = channel;
                    settings.save((err) => {
                        if (err)
                            return dbErrHandler(err);
                        console.log('ADMIN DB: successfully set channel to', settings.channel);
                        return settings;
                    });
                }
            });
        });
    },
    /**
     * Save admins to settings
     * @param {string[]} admins array of Slack user IDs for admins
     * @return {Promise<IAdminDocument>} promise: new settings
     */
    setAdmins(admins) {
        return __awaiter(this, void 0, void 0, function* () {
            return AdminSchema_1.default.findOne({}, (err, settings) => {
                if (err)
                    return dbErrHandler(err);
                if (!admins || !admins.length)
                    return dbErrHandler({ message: 'No users provided' });
                // No settings exist yet; save new settings document
                if (!settings) {
                    const newSettings = new AdminSchema_1.default({
                        channel: process.env.SLACK_CHANNEL_ID,
                        admins: admins
                    });
                    newSettings.save((err) => {
                        if (err)
                            return dbErrHandler(err);
                        return newSettings;
                    });
                }
                // Update existing settings object
                else {
                    settings.admins = admins;
                    settings.save((err) => {
                        if (err)
                            return dbErrHandler(err);
                        console.log('ADMIN DB: successfully updated admin list to', settings.admins);
                        return settings;
                    });
                }
            });
        });
    }
};
exports.adminApi = adminApi;
//# sourceMappingURL=admin.js.map