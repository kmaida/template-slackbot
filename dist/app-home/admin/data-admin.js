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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeViews = exports.saveHomeView = exports.setAdmins = exports.setChannel = exports.getAdminSettings = exports.initAdminSettings = void 0;
const AdminSchema_1 = require("./AdminSchema");
/*------------------
ADMINS SETTINGS API
------------------*/
/**
 * Database error handler
 * Private (not exported)
 * @param {IObjectAny}
 * @return {IObjectAny} Error object
 */
const _dbErrHandler = (err) => {
    const errMsg = `ADMIN SETTINGS DB Error: ${err.message || err}`;
    console.error(errMsg);
    return new Error(errMsg);
};
/**
   * Initialize and set settings from ENV if there are no settings in DB
   * @return {Promise<IAdminDocument>} promise: admin settings document
   */
const initAdminSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AdminSettingsModel.findOne({}, (err, settings) => {
        if (err)
            return _dbErrHandler(err);
        if (!settings) {
            const newSettings = new AdminSchema_1.AdminSettingsModel({
                channel: process.env.SLACK_CHANNEL_ID,
                admins: process.env.SLACK_ADMINS.split(',')
            });
            newSettings.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                console.log('ADMIN DB: Set new admin settings from environment variables');
                return newSettings;
            });
        }
    });
});
exports.initAdminSettings = initAdminSettings;
/**
 * Get settings object
 * @return {Promise<IAdminDocument>} promise: admin settings document
 */
const getAdminSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AdminSettingsModel.findOne({}, (err, settings) => {
        if (err)
            return _dbErrHandler(err);
        if (!settings)
            return new Error('ADMIN DB: No admin settings are saved');
        return settings;
    });
});
exports.getAdminSettings = getAdminSettings;
/**
 * Save reporting channel to store
 * @param {string} channel channel ID to save to DB
 * @return {Promise<IAdminDocument>} promise: admin settings document
 */
const setChannel = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AdminSettingsModel.findOne({}, (err, settings) => {
        if (err)
            return _dbErrHandler(err);
        if (!channel)
            return _dbErrHandler({ message: 'No channel provided' });
        // No settings exist yet; save new settings document
        if (!settings) {
            const newSettings = new AdminSchema_1.AdminSettingsModel({
                channel: channel,
                admins: process.env.SLACK_ADMINS.split(',')
            });
            newSettings.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                return newSettings;
            });
        }
        // Update existing settings object
        else {
            settings.channel = channel;
            settings.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                console.log('ADMIN DB: successfully set channel to', settings.channel);
                return settings;
            });
        }
    });
});
exports.setChannel = setChannel;
/**
 * Save admins to settings
 * @param {string[]} admins array of Slack user IDs for admins
 * @return {Promise<IAdminDocument>} promise: new settings
 */
const setAdmins = (admins) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AdminSettingsModel.findOne({}, (err, settings) => {
        if (err)
            return _dbErrHandler(err);
        if (!admins || !admins.length)
            return _dbErrHandler({ message: 'No users provided' });
        // No settings exist yet; save new settings document
        if (!settings) {
            const newSettings = new AdminSchema_1.AdminSettingsModel({
                channel: process.env.SLACK_CHANNEL_ID,
                admins: admins
            });
            newSettings.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                return newSettings;
            });
        }
        // Update existing settings object
        else {
            settings.admins = admins;
            settings.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                console.log('ADMIN DB: successfully updated admin list to', settings.admins);
                return settings;
            });
        }
    });
});
exports.setAdmins = setAdmins;
/**
 * Save user's home view data the first time they open their home view
 * @param {string} userID user's ID
 * @param {string} viewID user's app home view ID
 * @returns {Promise<IAppHomeDocument>} saved view data document
 */
const saveHomeView = (userID, viewID) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AppHomeModel.findOne({ userID }, (err, appHome) => {
        if (err)
            return _dbErrHandler(err);
        if (!viewID)
            return _dbErrHandler({ message: 'No view ID provided' });
        if (!appHome) {
            const newAppHome = new AdminSchema_1.AppHomeModel({ userID, viewID });
            newAppHome.save((err) => {
                if (err)
                    return _dbErrHandler(err);
                console.log('ADMIN DB: successfully saved user\'s App Home viewID');
                return newAppHome;
            });
        }
        else {
            return appHome;
        }
    });
});
exports.saveHomeView = saveHomeView;
/**
 * Get all App Home views for users who have previously opened App Home
 * @returns {Promise<IAppHomeDocument[]} array of app home objects
 */
const getHomeViews = () => __awaiter(void 0, void 0, void 0, function* () {
    return AdminSchema_1.AppHomeModel.find({}, (err, appHomes) => {
        if (err)
            return _dbErrHandler(err);
        if (!appHomes)
            return new Error('No user homes found');
        return appHomes;
    });
});
exports.getHomeViews = getHomeViews;
//# sourceMappingURL=data-admin.js.map