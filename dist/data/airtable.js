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
const base = require('airtable').base('appEKCgBRM6kj1eaD');
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
const errors_1 = __importDefault(require("./../utils/errors"));
const dm_confirm_save_1 = __importDefault(require("./../bot-publish/dm-confirm-save"));
const channel_publish_save_1 = __importDefault(require("./../bot-publish/channel-publish-save"));
/*------------------
  AIRTABLE: TABLE
------------------*/
const at = {
    /**
     * Save a new Airtable data record
     * @param {IObjectAny} App Slack app
     * @param {IATData} data to save to Airtable
     * @return {Promise<IATData>} promise resolving with saved object
     */
    saveData(app, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return base(table).create([
                {
                    "fields": {
                        "Name": data.name,
                        "URL": data.url,
                        "Notes": data.notes || '',
                        "Slack ID": data.slackID
                    }
                }
            ], (err, records) => {
                if (err) {
                    errors_1.default.storeErr(err);
                }
                const savedRecord = records[0];
                const savedID = savedRecord.getId();
                const savedObj = {
                    id: savedID,
                    name: savedRecord.fields["Name"],
                    url: savedRecord.fields["URL"],
                    notes: savedRecord.fields["Notes"] || '',
                    slackID: savedRecord.fields["Slack ID"],
                    link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
                };
                console.log('AIRTABLE: Saved new record', savedObj);
                // Send Slack DM to submitter confirming successful save
                dm_confirm_save_1.default(app, savedObj);
                // Send Slack channel message
                channel_publish_save_1.default(app, savedObj);
                // @NOTE: If you want to update home view: need to have passed user's app home view ID
                return savedObj;
            });
        });
    }
};
exports.default = at;
//# sourceMappingURL=airtable.js.map