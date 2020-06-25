const base = require('airtable').base('appEKCgBRM6kj1eaD');
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
import { IObjectAny, IATData } from '../../types';
import { storeErr } from '../../utils/errors';
import dmConfirmSave from './dm-confirm-save';
import channelPublishSave from './channel-publish-save';

/*------------------
  AIRTABLE: TABLE
------------------*/


/**
 * Save a new Airtable data record
 * @param {IObjectAny} App Slack app
 * @param {IATData} data to save to Airtable
 * @return {Promise<IATData>} promise resolving with saved object
 */
const saveData = async (app: IObjectAny, data: IATData): Promise<IATData> => {
  return base(table).create([
    {
      "fields": {
        "Name": data.name,
        "URL": data.url,
        "Notes": data.notes || '',
        "Slack ID": data.slackID
      }
    }
  ], (err: string, records: IObjectAny) => {
    if (err) {
      storeErr(err);
    }
    const savedRecord: IObjectAny = records[0];
    const savedID: string = savedRecord.getId();
    const savedObj: IATData = {
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

export { saveData };
