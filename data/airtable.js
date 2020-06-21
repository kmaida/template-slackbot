const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
const errors = require('./../utils/errors');
const dmConfirmSave = require('./../bot-publish/dm-confirm-save');
const channelPublishSave = require('../bot-publish/channel-publish-save');

/*------------------
  AIRTABLE: TABLE
------------------*/

const at = {
  /*--
  Save a new Airtable data record
  @param: {App} Slack app
  @param: {object} data to save
  @return: {object} saved object
  --*/
  async saveData(app, data) {
    base(table).create([
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
        errors.storeErr(err);
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
      dmConfirmSave(app, savedObj);
      // Send Slack channel message
      channelPublishSave(app, savedObj);
      // @NOTE: If you want to update home view: need to have passed user's app home view ID
      return savedObj;
    });
  }
};

module.exports = at;