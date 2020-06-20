const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
const errors = require('./../utils/errors');

/*------------------
  AIRTABLE: TABLE
------------------*/

const at = {
  /*--
  Save a new record
  @Param: Slack app
  @Param: data to save (object)
  @Return: saved object
  --*/
  async saveRecord(app, data) {
    base(table).create([
      {
        "fields": {
          "Name": data.name,
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
        fields: savedRecord.fields,
        link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
      };
      console.log('AIRTABLE: Saved new record', savedObj);
      // If you want to update home view: need to have passed user's app home view ID
      // Send Slack message (pass parameters for app, saved)
      return savedObj;
    });
  }
};

module.exports = at;