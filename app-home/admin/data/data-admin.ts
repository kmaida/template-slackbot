import { IObjectAny } from '../../../utils/types';
import { IAdminDocument } from './../admin.interface';
import { IAppHomeData, IAppHomeDocument } from './../../app-home.interface';
import { AdminSettingsModel, AppHomeModel } from './AdminSchema';

/*------------------
ADMINS SETTINGS API
------------------*/

/**
 * Database error handler
 * Private (not exported)
 * @param {IObjectAny}
 * @return {IObjectAny} Error object
 */
const _dbErrHandler = (err: IObjectAny): IObjectAny => {
  const errMsg = `ADMIN SETTINGS DB Error: ${err.message || err}`;
  console.error(errMsg);
  return new Error(errMsg);
};

/**
   * Initialize and set settings from ENV if there are no settings in DB
   * @return {Promise<IAdminDocument>} promise: admin settings document
   */
const initAdminSettings = async (): Promise<IAdminDocument> => {
  return AdminSettingsModel.findOne({}, (err: IObjectAny, settings: IAdminDocument) => {
    if (err) return _dbErrHandler(err);
    if (!settings) {
      const newSettings: IAdminDocument = new AdminSettingsModel({
        channel: process.env.SLACK_CHANNEL_ID,
        admins: process.env.SLACK_ADMINS.split(',')
      });
      newSettings.save((err) => {
        if (err) return _dbErrHandler(err);
        console.log('ADMIN DB: Set new admin settings from environment variables');
        return newSettings;
      });
    }
  });
};

/**
 * Get settings object
 * @return {Promise<IAdminDocument>} promise: admin settings document
 */
const getAdminSettings = async (): Promise<IAdminDocument> => {
  return AdminSettingsModel.findOne({}, (err: IObjectAny, settings: IAdminDocument) => {
    if (err) return _dbErrHandler(err);
    if (!settings) return new Error('ADMIN DB: No admin settings are saved');
    return settings;
  });
};

/**
 * Save reporting channel to store
 * @param {string} channel channel ID to save to DB
 * @return {Promise<IAdminDocument>} promise: admin settings document
 */
const setChannel = async (channel: string): Promise<IAdminDocument> => {
  return AdminSettingsModel.findOne({}, (err: IObjectAny, settings: IAdminDocument) => {
    if (err) return _dbErrHandler(err);
    if (!channel) return _dbErrHandler({message: 'No channel provided'});
    // No settings exist yet; save new settings document
    if (!settings) {
      const newSettings: IAdminDocument = new AdminSettingsModel({
        channel: channel,
        admins: process.env.SLACK_ADMINS.split(',')
      });
      newSettings.save((err: IObjectAny) => {
        if (err) return _dbErrHandler(err);
        return newSettings;
      });
    }
    // Update existing settings object
    else {
      settings.channel = channel;
      settings.save((err: IObjectAny) => {
        if (err) return _dbErrHandler(err);
        console.log('ADMIN DB: successfully set channel to', settings.channel);
        return settings;
      });
    }
  });
};

/**
 * Save admins to settings
 * @param {string[]} admins array of Slack user IDs for admins
 * @return {Promise<IAdminDocument>} promise: new settings
 */
const setAdmins = async (admins: string[]): Promise<IAdminDocument> => {
  return AdminSettingsModel.findOne({}, (err: IObjectAny, settings: IAdminDocument) => {
    if (err) return _dbErrHandler(err);
    if (!admins || !admins.length) return _dbErrHandler({message: 'No users provided'});
    // No settings exist yet; save new settings document
    if (!settings) {
      const newSettings: IAdminDocument = new AdminSettingsModel({
        channel: process.env.SLACK_CHANNEL_ID,
        admins: admins
      });
      newSettings.save((err: IObjectAny) => {
        if (err) return _dbErrHandler(err);
        return newSettings;
      });
    }
    // Update existing settings object
    else {
      settings.admins = admins;
      settings.save((err: IObjectAny) => {
        if (err) return _dbErrHandler(err);
        console.log('ADMIN DB: successfully updated admin list to', settings.admins);
        return settings;
      });
    }
  });
};

/**
 * Save user's home view data the first time they open their home view
 * @param {string} userID user's ID 
 * @param {string} viewID user's app home view ID
 * @returns {Promise<IAppHomeDocument>} saved view data document
 */
const saveHomeView = async (userID: string, viewID: string): Promise<IAppHomeDocument> => {
  return AppHomeModel.findOne({userID}, (err: IObjectAny, appHome: IAppHomeData) => {
    if (err) return _dbErrHandler(err);
    if (!viewID) return _dbErrHandler({message: 'No view ID provided'});
    if (!appHome) {
      const newAppHome: IAppHomeDocument = new AppHomeModel({userID, viewID});
      newAppHome.save((err: IObjectAny) => {
        if (err) return _dbErrHandler(err);
        console.log('ADMIN DB: successfully saved user\'s App Home viewID');
        return newAppHome;
      });
    } else {
      return appHome;
    }
  });
};

/**
 * Get all App Home views for users who have previously opened App Home
 * @returns {Promise<IAppHomeDocument[]} array of app home objects
 */
const getHomeViews = async (): Promise<IAppHomeDocument[]> => {
  return AppHomeModel.find({}, (err, appHomes) => {
    if (err) return _dbErrHandler(err);
    if (!appHomes) return new Error('No user homes found');
    return appHomes;
  });
};

export { initAdminSettings, getAdminSettings, setChannel, setAdmins, saveHomeView, getHomeViews };