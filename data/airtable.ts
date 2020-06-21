const base = require('airtable').base('appEKCgBRM6kj1eaD');
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
import errors from './../utils/errors';
import dmConfirmSave from './../bot-publish/dm-confirm-save';
import channelPublishSave from './../bot-publish/channel-publish-save';
import { ObjectAny, ATData } from './../types/types';

/*------------------
  AIRTABLE: TABLE
------------------*/

const at = {
  /**
   * Save a new Airtable data record
   * @param {App} App Slack app
   * @param {ATData} data to save to Airtable
   * @return {ATData} saved object
   */
  async saveData(app, data: ATData) {
    base(table).create([
      {
        "fields": {
          "Name": data.name,
          "URL": data.url,
          "Notes": data.notes || '',
          "Slack ID": data.slackID
        }
      }
    ], (err: string, records: ObjectAny) => {
      if (err) {
        errors.storeErr(err);
      }
      const savedRecord: ObjectAny = records[0];
      const savedID: string = savedRecord.getId();
      const savedObj: ATData = {
        id: savedID,
        name: savedRecord.fields["Name"],
        url: savedRecord.fields["URL"],
        notes: savedRecord.fields["Notes"] || '',
        slackID: savedRecord.fields["Slack ID"],
        link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
      };
      console.log('AIRTABLE: Saved new record', savedObj);
      // Send Slack DM to submitter confirming successful save
      dmConfirmSave(app, savedObj);
      // Send Slack channel message
      channelPublishSave(app, savedObj);
      // @NOTE: If you want to update home view: need to have passed user's app home view ID
      return savedObj;
    });
  }
};

export default at;
