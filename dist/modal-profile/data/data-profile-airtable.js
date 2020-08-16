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
exports.saveData = void 0;
const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
const errors_1 = require("../../utils/errors");
const dm_confirm_save_profile_1 = require("../dm-confirm-save-profile");
const channel_publish_save_profile_1 = require("../channel-publish-save-profile");
/*------------------
  AIRTABLE: TABLE
------------------*/
/**
 * Save a new Airtable data record
 * @param {IObjectAny} App Slack app
 * @param {IProfile} data to save to Airtable
 * @return {Promise<IProfile>} promise resolving with saved object
 */
const saveData = (app, data) => __awaiter(void 0, void 0, void 0, function* () {
    return base(table).create([
        {
            "fields": {
                "Name": data.name,
                "Image": data.image,
                "Email": data.email,
                "URL": data.url,
                "Bio": data.bio || '',
                "Slack ID": data.slackID
            }
        }
    ], (err, records) => {
        if (err) {
            errors_1.storeErr(err);
        }
        const savedRecord = records[0];
        const savedID = savedRecord.getId();
        const savedObj = {
            id: savedID,
            name: savedRecord.fields["Name"],
            image: savedRecord.fields["Image"],
            email: savedRecord.fields["Email"],
            url: savedRecord.fields["URL"],
            bio: savedRecord.fields["Bio"] || '',
            slackID: savedRecord.fields["Slack ID"],
            link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
        };
        console.log('AIRTABLE: Saved new record', savedObj);
        // Send Slack DM to submitter confirming successful save
        dm_confirm_save_profile_1.dmConfirmSave(app, savedObj);
        // Send Slack channel message
        channel_publish_save_profile_1.channelPublishSave(app, savedObj);
        // @NOTE: If you want to update home view: need to have passed user's app home view ID
        return savedObj;
    });
});
exports.saveData = saveData;
//# sourceMappingURL=data-profile-airtable.js.map